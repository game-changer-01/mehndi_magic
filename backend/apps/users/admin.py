from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'is_approved', 'average_rating', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('role', 'is_approved', 'date_joined')
    list_editable = ('is_approved',)
    ordering = ('-date_joined',)
