from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.create_user , name='signup'),
    path('me/', views.user_detail, name='user_detail'),
    path('upload-model/', views.upload_model, name='upload-model'),
    path('list-models/', views.list_models, name='list-models'),
    path('delete-model/<int:pk>/', views.delete_model, name='delete-model'),
    path('download_all_models/', views.download_all_models, name='download_all_models'),
    path('health/', views.health_check, name='health-check'),  # Health check endpoint
]