from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryListView, DesignViewSet, FavoriteListView,
    ReviewListCreateView, trending_designs
)

router = DefaultRouter()
router.register(r'designs', DesignViewSet, basename='design')

urlpatterns = [
    # Categories
    path('categories/', CategoryListView.as_view(), name='category-list'),
    
    # Designs (via router - includes list, create, retrieve, update, delete, like, favorite)
    path('', include(router.urls)),
    
    # Trending
    path('trending/', trending_designs, name='trending-designs'),
    
    # Favorites
    path('favorites/', FavoriteListView.as_view(), name='favorite-list'),
    
    # Reviews
    path('designers/<int:designer_id>/reviews/', ReviewListCreateView.as_view(), name='designer-reviews'),
]