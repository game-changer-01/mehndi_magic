from django.contrib import admin
from .models import Design, Category, Review, Like, Favorite

@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display = ('title', 'designer', 'category', 'status', 'likes_count', 'created_at')
    search_fields = ('title', 'description', 'designer__username')
    list_filter = ('status', 'category')
    list_editable = ('status',)
    ordering = ('-created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('customer', 'designer', 'rating', 'is_reported', 'is_approved', 'created_at')
    list_filter = ('rating', 'is_reported', 'is_approved')
    search_fields = ('customer__username', 'designer__username', 'comment')


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'design', 'reaction_type', 'created_at')
    list_filter = ('reaction_type',)


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'design', 'created_at')
