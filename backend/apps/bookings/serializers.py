from rest_framework import serializers
from .models import Booking, Notification
from django.contrib.auth import get_user_model

User = get_user_model()


class BookingSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    designer_name = serializers.CharField(source='designer.username', read_only=True)
    designer_phone = serializers.CharField(source='designer.phone', read_only=True)
    customer_phone = serializers.CharField(source='customer.phone', read_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['customer', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['customer'] = request.user
        return super().create(validated_data)
    
    def validate(self, attrs):
        # Validate designer is approved
        designer = attrs.get('designer')
        if designer and designer.role != 'designer':
            raise serializers.ValidationError("Selected user is not a designer.")
        if designer and not designer.is_approved:
            raise serializers.ValidationError("Designer is not approved yet.")
        
        # Validate date is in future
        from datetime import date
        booking_date = attrs.get('booking_date')
        if booking_date and booking_date < date.today():
            raise serializers.ValidationError("Booking date must be in the future.")
        
        return attrs


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
