from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    """
    Custom User model with three roles: Designer, Customer, and Admin
    """
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('designer', 'Designer'),
        ('admin', 'Admin'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    
    # Designer-specific fields
    is_approved = models.BooleanField(default=False)  # Admin approval for designers
    years_of_experience = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    specialization = models.CharField(max_length=200, blank=True, null=True)  # e.g., "Bridal, Traditional, Arabic"
    portfolio_url = models.URLField(blank=True, null=True)
    
    # Statistics
    total_bookings = models.IntegerField(default=0)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
    
    @property
    def is_designer(self):
        return self.role == 'designer'
    
    @property
    def is_customer(self):
        return self.role == 'customer'
    
    @property
    def is_admin_user(self):
        return self.role == 'admin' or self.is_superuser