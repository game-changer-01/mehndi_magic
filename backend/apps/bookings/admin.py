from django.contrib import admin
from .models import Booking, Notification

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'designer', 'booking_date', 'booking_time', 'status', 'created_at')
    search_fields = ('customer__username', 'designer__username')
    list_filter = ('status', 'booking_date')
    ordering = ('-booking_date', '-booking_time')


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'notification_type', 'title', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read')
    search_fields = ('user__username', 'title', 'message')
