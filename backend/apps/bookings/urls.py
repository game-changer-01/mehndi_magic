from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BookingViewSet, NotificationListView,
    mark_notification_read, dashboard_stats
)

router = DefaultRouter()
router.register(r'', BookingViewSet, basename='booking')

urlpatterns = [
    # Bookings (via router - includes list, create, retrieve, update, cancel action)
    path('', include(router.urls)),
    
    # Notifications
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', mark_notification_read, name='notification-read'),
    
    # Dashboard
    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),
]