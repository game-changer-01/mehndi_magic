from rest_framework import generics, status, permissions, filters, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Design, Like, Favorite, Review
from .serializers import (
    CategorySerializer, DesignListSerializer, DesignDetailSerializer,
    DesignSerializer, LikeSerializer, FavoriteSerializer, ReviewSerializer
)


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DesignViewSet(viewsets.ModelViewSet):
    queryset = Design.objects.all()
    serializer_class = DesignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'designer', 'status']
    search_fields = ['title', 'description', 'tags']
    ordering_fields = ['created_at', 'likes_count', 'views_count']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Design.objects.filter(status='approved')
        if self.request.user.is_authenticated and self.request.user.role == 'designer':
            queryset = Design.objects.filter(Q(status='approved') | Q(designer=self.request.user))
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        if self.request.user.role != 'designer':
            raise permissions.PermissionDenied('Only designers can upload designs')
        if not self.request.user.is_approved:
            raise permissions.PermissionDenied('Designer account not approved yet')
        serializer.save(designer=self.request.user, status='pending')
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        design = self.get_object()
        reaction_type = request.data.get('reaction_type', 'like')
        
        existing = Like.objects.filter(user=request.user, design=design).first()
        
        if existing:
            if existing.reaction_type == 'like':
                design.likes_count = max(0, design.likes_count - 1)
            else:
                design.dislikes_count = max(0, design.dislikes_count - 1)
            
            if existing.reaction_type == reaction_type:
                existing.delete()
                design.save()
                return Response({'message': 'Reaction removed', 'liked': False})
            
            existing.reaction_type = reaction_type
            existing.save()
        else:
            existing = Like.objects.create(user=request.user, design=design, reaction_type=reaction_type)
        
        if reaction_type == 'like':
            design.likes_count += 1
        else:
            design.dislikes_count += 1
        
        design.save()
        
        return Response({
            'message': f'{reaction_type.capitalize()} recorded',
            'liked': reaction_type == 'like',
            'likes_count': design.likes_count,
            'dislikes_count': design.dislikes_count
        })
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def favorite(self, request, pk=None):
        design = self.get_object()
        favorite = Favorite.objects.filter(user=request.user, design=design).first()
        
        if favorite:
            favorite.delete()
            return Response({'message': 'Removed from favorites', 'favorited': False})
        else:
            Favorite.objects.create(user=request.user, design=design)
            return Response({'message': 'Added to favorites', 'favorited': True})


class FavoriteListView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)


class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        designer_id = self.kwargs.get('designer_id')
        return Review.objects.filter(designer_id=designer_id, is_approved=True)
    
    def perform_create(self, serializer):
        designer_id = self.kwargs.get('designer_id')
        serializer.save(customer=self.request.user, designer_id=designer_id)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def trending_designs(request):
    """Get trending designs"""
    designs = Design.objects.filter(status='approved').order_by('-likes_count', '-views_count')[:12]
    serializer = DesignListSerializer(designs, many=True, context={'request': request})
    return Response(serializer.data)
