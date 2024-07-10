from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.create_user , name='signup'),
    path('me/', views.user_detail, name='user_detail'),
]