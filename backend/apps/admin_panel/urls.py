from django.urls import path
from .views import (
    admin_dashboard, pending_designers, approve_designer,
    pending_designs, approve_design, reject_design,
    reported_reviews, handle_review_report
)

urlpatterns = [
    # Dashboard
    path('dashboard/', admin_dashboard, name='admin-dashboard'),
    
    # Designer Management
    path('designers/pending/', pending_designers, name='pending-designers'),
    path('designers/<int:user_id>/approve/', approve_designer, name='approve-designer'),
    
    # Design Management
    path('designs/pending/', pending_designs, name='pending-designs'),
    path('designs/<int:design_id>/approve/', approve_design, name='approve-design'),
    path('designs/<int:design_id>/reject/', reject_design, name='reject-design'),
    
    # Review Moderation
    path('reviews/reported/', reported_reviews, name='reported-reviews'),
    path('reviews/<int:review_id>/handle/', handle_review_report, name='handle-review'),
]