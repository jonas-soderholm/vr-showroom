from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserModel

# Define the custom User model
User = get_user_model()

class UserAdmin(BaseUserAdmin):
    # Customize the user admin interface here if needed
    list_display = ('username', 'email', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ('username',)

admin.site.register(User, UserAdmin)

# Register UserModel with the default ModelAdmin
@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'file', 'uploaded_at')
    search_fields = ('name', 'user__username')
    list_filter = ('uploaded_at',)
    ordering = ('-uploaded_at',)
