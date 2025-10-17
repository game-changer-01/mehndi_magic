from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, LoginView, ProfileView,
    UserListView, UserDetailView,
    DesignerListView, DesignerDetailView
)

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Profile
    path('profile/', ProfileView.as_view(), name='profile'),
    
    # Users
    path('', UserListView.as_view(), name='user-list'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    
    # Designers
    path('designers/', DesignerListView.as_view(), name='designer-list'),
    path('designers/<int:pk>/', DesignerDetailView.as_view(), name='designer-detail'),
]