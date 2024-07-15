from django.db import models
from django.contrib.auth import get_user_model
import os

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Add custom fields here if needed
    pass

User = get_user_model()


class UserModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='user_models/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def get_upload_to(instance, filename):
        return os.path.join('models', instance.user.username, filename)

    file = models.FileField(upload_to=get_upload_to)

