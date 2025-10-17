from rest_framework import serializers
from .models import Category, Design, Like, Favorite, Review
from django.contrib.auth import get_user_model

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    designs_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'designs_count', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_designs_count(self, obj):
        return obj.designs.filter(status='approved').count()


class DesignListSerializer(serializers.ModelSerializer):
    designer_name = serializers.CharField(source='designer.username', read_only=True)
    designer_profile_picture = serializers.ImageField(source='designer.profile_picture', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    
    class Meta:
        model = Design
        fields = [
            'id', 'title', 'image', 'category', 'category_name',
            'designer', 'designer_name', 'designer_profile_picture',
            'likes_count', 'dislikes_count', 'views_count',
            'is_liked', 'is_favorited', 'created_at'
        ]
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, design=obj, reaction_type='like').exists()
        return False
    
    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, design=obj).exists()
        return False


class DesignDetailSerializer(serializers.ModelSerializer):
    designer_name = serializers.CharField(source='designer.username', read_only=True)
    designer_id = serializers.IntegerField(source='designer.id', read_only=True)
    designer_profile_picture = serializers.ImageField(source='designer.profile_picture', read_only=True)
    designer_rating = serializers.DecimalField(source='designer.average_rating', max_digits=3, decimal_places=2, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    tags_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Design
        fields = '__all__'
        read_only_fields = ['designer', 'likes_count', 'dislikes_count', 'views_count', 'created_at', 'updated_at']
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, design=obj, reaction_type='like').exists()
        return False
    
    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, design=obj).exists()
        return False
    
    def get_tags_list(self, obj):
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(',')]
        return []


class DesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Design
        fields = '__all__'
        read_only_fields = ['designer', 'likes_count', 'dislikes_count', 'views_count']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['designer'] = request.user
        validated_data['status'] = 'pending'
        return super().create(validated_data)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'design', 'reaction_type', 'created_at']
        read_only_fields = ['id', 'created_at']


class FavoriteSerializer(serializers.ModelSerializer):
    design_details = DesignListSerializer(source='design', read_only=True)
    
    class Meta:
        model = Favorite
        fields = ['id', 'design', 'design_details', 'created_at']
        read_only_fields = ['id', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    customer_profile_picture = serializers.ImageField(source='customer.profile_picture', read_only=True)
    designer_name = serializers.CharField(source='designer.username', read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['id', 'customer', 'designer_response', 'response_date', 'is_approved', 'created_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['customer'] = request.user
        return super().create(validated_data)
