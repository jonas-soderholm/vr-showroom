from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserModelSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import UserModel
from rest_framework.permissions import IsAdminUser
from django.db import IntegrityError
import os
import io
import zipfile
from django.http import HttpResponse
from django.conf import settings

User = get_user_model()

MAX_UPLOADS = 6
MAX_FILE_SIZE_MB = 10


class CustomUserRateThrottle(UserRateThrottle):
    rate = '100/hour'  # Custom rate limit for authenticated users

class CustomAnonRateThrottle(AnonRateThrottle):
    rate = '100/hour'  # Custom rate limit for unauthenticated users


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({'status': 'healthy'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
# @permission_classes([AllowAny])
def create_user(request):
    data = request.data.copy()

    # Convert the username to lowercase if it exists in the data
    if 'username' in data:
        data['username'] = data['username'].lower()

    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Convert the username to lowercase
        attrs['username'] = attrs.get('username', '').lower()
        return super().validate(attrs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer







@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@throttle_classes([CustomUserRateThrottle, CustomAnonRateThrottle])
def upload_model(request):
    user = request.user

    # Check the number of models
    if UserModel.objects.filter(user=user).count() >= MAX_UPLOADS:
        return Response({'error': f'You can only upload a maximum of {MAX_UPLOADS} models.'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES.get('file')
    if not file:
        return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check file size
    if file.size > MAX_FILE_SIZE_MB * 1024 * 1024:
        return Response({'error': f'File size should not exceed {MAX_FILE_SIZE_MB}MB.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check file type
    if not file.name.lower().endswith('.glb'):
        return Response({'error': 'Only .glb files are allowed.'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserModelSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_models(request):
    user = request.user
    models = UserModel.objects.filter(user=user)
    serializer = UserModelSerializer(models, many=True)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_model(request, pk):
    try:
        user_model = UserModel.objects.get(pk=pk, user=request.user)
        file_path = user_model.file.path  # Get the file path before deleting the model
        user_model.delete()
        
        if os.path.exists(file_path):
            os.remove(file_path)
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    except UserModel.DoesNotExist:
        return Response({'error': 'Model not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
@throttle_classes([CustomUserRateThrottle, CustomAnonRateThrottle])
def download_all_models(request):
    try:
        user = request.user
        user_models = UserModel.objects.filter(user=user)

        if not user_models.exists():
            return Response({'error': "No models found for the user."}, status=status.HTTP_404_NOT_FOUND)

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for model in user_models:
                file_path = os.path.join(settings.MEDIA_ROOT, model.file.name)
                if os.path.exists(file_path):
                    file_name = os.path.basename(file_path)
                    with open(file_path, 'rb') as f:
                        zip_file.writestr(file_name, f.read())
                else:
                    logger.error(f"File not found: {file_path}")

        zip_buffer.seek(0)
        response = HttpResponse(zip_buffer, content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename={user.username}_models.zip'
        return response

    except Exception as e:
        logger.error(f"Error creating zip file: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
