from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from apps.gallery.models import Design, Review
from apps.bookings.models import Booking
from apps.users.serializers import UserSerializer
from apps.gallery.serializers import DesignSerializer, ReviewSerializer

User = get_user_model()


class IsAdminUser(permissions.BasePermission):
    """Custom permission for admin users"""
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.role == 'admin' or request.user.is_superuser
        )


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    """Admin dashboard statistics"""
    total_users = User.objects.count()
    total_designers = User.objects.filter(role='designer').count()
    total_customers = User.objects.filter(role='customer').count()
    pending_designers = User.objects.filter(role='designer', is_approved=False).count()
    
    total_designs = Design.objects.count()
    pending_designs = Design.objects.filter(status='pending').count()
    approved_designs = Design.objects.filter(status='approved').count()
    
    total_bookings = Booking.objects.count()
    pending_bookings = Booking.objects.filter(status='pending').count()
    completed_bookings = Booking.objects.filter(status='completed').count()
    
    reported_reviews = Review.objects.filter(is_reported=True).count()
    
    top_designers = User.objects.filter(role='designer', is_approved=True).order_by('-average_rating')[:5]
    popular_designs = Design.objects.filter(status='approved').order_by('-likes_count')[:5]
    
    return Response({
        'users': {
            'total': total_users,
            'designers': total_designers,
            'customers': total_customers,
            'pending_designers': pending_designers,
        },
        'designs': {
            'total': total_designs,
            'pending': pending_designs,
            'approved': approved_designs,
        },
        'bookings': {
            'total': total_bookings,
            'pending': pending_bookings,
            'completed': completed_bookings,
        },
        'moderation': {
            'reported_reviews': reported_reviews,
        },
        'top_designers': UserSerializer(top_designers, many=True).data,
        'popular_designs': DesignSerializer(popular_designs, many=True).data,
    })


@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_designers(request):
    """List designers pending approval"""
    designers = User.objects.filter(role='designer', is_approved=False)
    serializer = UserSerializer(designers, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_designer(request, user_id):
    """Approve a designer"""
    try:
        user = User.objects.get(id=user_id, role='designer')
        user.is_approved = True
        user.save()
        
        from apps.bookings.models import Notification
        Notification.objects.create(
            user=user,
            notification_type='designer_approved',
            title='Account Approved',
            message='Your designer account has been approved!'
        )
        
        return Response({'message': 'Designer approved successfully'})
    except User.DoesNotExist:
        return Response({'error': 'Designer not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_designs(request):
    """List designs pending approval"""
    designs = Design.objects.filter(status='pending')
    serializer = DesignSerializer(designs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_design(request, design_id):
    """Approve a design"""
    try:
        design = Design.objects.get(id=design_id)
        design.status = 'approved'
        design.save()
        return Response({'message': 'Design approved successfully'})
    except Design.DoesNotExist:
        return Response({'error': 'Design not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def reject_design(request, design_id):
    """Reject a design"""
    try:
        design = Design.objects.get(id=design_id)
        design.status = 'rejected'
        design.save()
        return Response({'message': 'Design rejected'})
    except Design.DoesNotExist:
        return Response({'error': 'Design not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def reported_reviews(request):
    """List reported reviews"""
    reviews = Review.objects.filter(is_reported=True)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def handle_review_report(request, review_id):
    """Handle reported review"""
    try:
        review = Review.objects.get(id=review_id)
        action = request.data.get('action')
        
        if action == 'approve':
            review.is_reported = False
            review.save()
            return Response({'message': 'Review approved'})
        elif action == 'reject':
            review.is_approved = False
            review.save()
            return Response({'message': 'Review hidden'})
        else:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
    except Review.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
