from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    """
    Design categories (e.g., Bridal, Traditional, Arabic, Modern)
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True, null=True)  # For icon class names
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name


class Design(models.Model):
    """
    Mehndi design uploaded by designers
    """
    STATUS_CHOICES = (
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    
    designer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='designs')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='designs/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='designs')
    
    # Metadata
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    views_count = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)
    dislikes_count = models.IntegerField(default=0)
    
    # Tags for better search
    tags = models.CharField(max_length=500, blank=True, null=True, help_text="Comma-separated tags")
    
    # Pricing (optional)
    price_range = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., $50-$100")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} by {self.designer.username}"
    
    @property
    def net_likes(self):
        return self.likes_count - self.dislikes_count


class Like(models.Model):
    """
    User likes/dislikes for designs
    """
    REACTION_CHOICES = (
        ('like', 'Like'),
        ('dislike', 'Dislike'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reactions')
    design = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='reactions')
    reaction_type = models.CharField(max_length=10, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'design')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} {self.reaction_type}s {self.design.title}"


class Favorite(models.Model):
    """
    Customer's favorite/wishlist designs
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorites')
    design = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'design')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} favorited {self.design.title}"


class Review(models.Model):
    """
    Customer reviews for designers
    """
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews_given')
    designer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews_received')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    
    # Designer response
    designer_response = models.TextField(blank=True, null=True)
    response_date = models.DateTimeField(blank=True, null=True)
    
    # Moderation
    is_reported = models.BooleanField(default=False)
    report_reason = models.TextField(blank=True, null=True)
    is_approved = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ('customer', 'designer')  # One review per customer-designer pair
    
    def __str__(self):
        return f"Review by {self.customer.username} for {self.designer.username} - {self.rating}★"