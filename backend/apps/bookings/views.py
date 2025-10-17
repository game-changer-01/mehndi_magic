from rest_framework import generics, status, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Booking, Notification
from .serializers import BookingSerializer, NotificationSerializer


class BookingViewSet(viewsets.ModelViewSet):
    """Manage bookings"""
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'designer':
            return Booking.objects.filter(designer=user)
        else:
            return Booking.objects.filter(customer=user)
    
    def perform_create(self, serializer):
        booking = serializer.save(customer=self.request.user)
        
        # Create notification for designer
        Notification.objects.create(
            user=booking.designer,
            notification_type='booking_created',
            title='New Booking Request',
            message=f'{booking.customer.username} has requested a booking on {booking.booking_date}',
            booking=booking
        )
    
    def perform_update(self, serializer):
        booking = serializer.save()
        
        # Notify on status change
        if 'status' in serializer.validated_data:
            if booking.status == 'confirmed':
                Notification.objects.create(
                    user=booking.customer,
                    notification_type='booking_confirmed',
                    title='Booking Confirmed',
                    message=f'Your booking with {booking.designer.username} has been confirmed',
                    booking=booking
                )
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel a booking"""
        booking = self.get_object()
        
        if booking.status == 'cancelled':
            return Response({'error': 'Booking already cancelled'}, status=status.HTTP_400_BAD_REQUEST)
        
        reason = request.data.get('reason', '')
        booking.status = 'cancelled'
        booking.cancelled_by = request.user
        booking.cancellation_reason = reason
        booking.save()
        
        # Notify other party
        notify_user = booking.designer if request.user == booking.customer else booking.customer
        Notification.objects.create(
            user=notify_user,
            notification_type='booking_cancelled',
            title='Booking Cancelled',
            message=f'Booking on {booking.booking_date} has been cancelled',
            booking=booking
        )
        
        return Response(BookingSerializer(booking).data)


class NotificationListView(generics.ListAPIView):
    """List user notifications"""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_notification_read(request, pk):
    """Mark notification as read"""
    try:
        notification = Notification.objects.get(pk=pk, user=request.user)
        notification.is_read = True
        notification.save()
        return Response({'message': 'Notification marked as read'})
    except Notification.DoesNotExist:
        return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_stats(request):
    """Get dashboard statistics"""
    user = request.user
    
    if user.role == 'designer':
        total_bookings = Booking.objects.filter(designer=user).count()
        pending_bookings = Booking.objects.filter(designer=user, status='pending').count()
        completed_bookings = Booking.objects.filter(designer=user, status='completed').count()
        total_designs = user.designs.filter(status='approved').count()
        
        return Response({
            'total_bookings': total_bookings,
            'pending_bookings': pending_bookings,
            'completed_bookings': completed_bookings,
            'total_designs': total_designs,
            'average_rating': float(user.average_rating),
        })
    else:
        total_bookings = Booking.objects.filter(customer=user).count()
        favorites_count = user.favorites.count()
        
        return Response({
            'total_bookings': total_bookings,
            'favorites_count': favorites_count,
        })
