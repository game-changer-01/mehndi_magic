from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model - general purpose
    """
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'password',
            'role', 'phone', 'profile_picture', 'bio', 'location',
            'is_approved', 'years_of_experience', 'specialization', 'portfolio_url',
            'total_bookings', 'average_rating', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'total_bookings', 'average_rating']
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name', 'role', 'phone']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Validate email
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email already exists."})
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        
        # If designer role, set is_approved to False (needs admin approval)
        if validated_data.get('role') == 'designer':
            validated_data['is_approved'] = False
        
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for designer profiles
    """
    designs_count = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'profile_picture', 'bio', 'location', 'phone',
            'years_of_experience', 'specialization', 'portfolio_url',
            'total_bookings', 'average_rating', 'is_approved', 'role',
            'designs_count', 'reviews_count', 'created_at'
        ]
        read_only_fields = ['id', 'total_bookings', 'average_rating', 'created_at']
    
    def get_designs_count(self, obj):
        if hasattr(obj, 'designs'):
            return obj.designs.filter(status='approved').count()
        return 0
    
    def get_reviews_count(self, obj):
        if hasattr(obj, 'reviews_received'):
            return obj.reviews_received.filter(is_approved=True).count()
        return 0


class DesignerListSerializer(serializers.ModelSerializer):
    """
    Minimal serializer for designer listings
    """
    designs_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name',
            'profile_picture', 'location', 'specialization',
            'average_rating', 'designs_count', 'years_of_experience'
        ]
    
    def get_designs_count(self, obj):
        return obj.designs.filter(status='approved').count()


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for user profile updates
    """
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone', 'profile_picture',
            'bio', 'location', 'years_of_experience', 'specialization', 'portfolio_url'
        ]
    
    def validate(self, attrs):
        user = self.instance
        # Only designers can update designer-specific fields
        if user and user.role != 'designer':
            designer_fields = ['years_of_experience', 'specialization', 'portfolio_url']
            for field in designer_fields:
                if field in attrs:
                    attrs.pop(field)
        return attrs
