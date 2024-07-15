from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserModelSerializer
from .models import UserModel
from django.db import IntegrityError
import os

User = get_user_model()

MAX_UPLOADS = 6
MAX_FILE_SIZE_MB = 10


@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)







# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def upload_model(request):
#     serializer = UserModelSerializer(data=request.data, context={'request': request})
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
    if not file.name.lower().endswith('.fbx'):
        return Response({'error': 'Only .fbx files are allowed.'}, status=status.HTTP_400_BAD_REQUEST)

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