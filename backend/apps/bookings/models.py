from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator


class Booking(models.Model):
    """
    Customer bookings for designers
    """
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings_made')
    designer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings_received')
    
    # Booking details
    booking_date = models.DateField()
    booking_time = models.TimeField()
    duration_hours = models.DecimalField(max_digits=3, decimal_places=1, default=2.0, validators=[MinValueValidator(0.5)])
    
    # Event details
    event_type = models.CharField(max_length=100, help_text="e.g., Wedding, Party, Festival")
    location = models.CharField(max_length=300)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Additional info
    notes = models.TextField(blank=True, null=True, help_text="Special requirements or notes")
    estimated_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Cancellation
    cancelled_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='cancelled_bookings')
    cancellation_reason = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-booking_date', '-booking_time']
    
    def __str__(self):
        return f"Booking: {self.customer.username} → {self.designer.username} on {self.booking_date}"
    
    @property
    def is_past(self):
        from django.utils import timezone
        from datetime import datetime, time
        
        now = timezone.now()
        booking_datetime = datetime.combine(self.booking_date, self.booking_time or time(0, 0))
        booking_datetime = timezone.make_aware(booking_datetime)
        return booking_datetime < now


class Notification(models.Model):
    """
    Email/In-app notifications for bookings and other events
    """
    NOTIFICATION_TYPES = (
        ('booking_created', 'Booking Created'),
        ('booking_confirmed', 'Booking Confirmed'),
        ('booking_cancelled', 'Booking Cancelled'),
        ('booking_reminder', 'Booking Reminder'),
        ('review_received', 'Review Received'),
        ('designer_approved', 'Designer Approved'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    
    # Related objects
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, null=True, blank=True, related_name='notifications')
    
    # Status
    is_read = models.BooleanField(default=False)
    is_emailed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.notification_type} for {self.user.username}"