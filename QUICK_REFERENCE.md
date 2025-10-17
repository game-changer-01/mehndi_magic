# Quick Reference - Mehndi Management System

## 🎯 Project Overview

A full-stack mehndi design management platform with 3 user roles (Customer, Designer, Admin), featuring design galleries, bookings, reviews, and content moderation.

## 📁 Structure

```
backend/
├── apps/
│   ├── users/        # Authentication, profiles, roles
│   ├── gallery/      # Designs, categories, likes, favorites, reviews
│   ├── bookings/     # Booking system, notifications
│   └── admin_panel/  # Admin dashboard, moderation
├── config/          # Django settings, URLs
└── media/           # Uploaded images

frontend/ (To be implemented)
├── src/
│   ├── pages/       # Page components
│   ├── components/  # Reusable components
│   ├── services/    # API calls
│   └── context/     # State management
```

## 🔑 Key Commands

### Backend

```bash
cd backend
python manage.py runserver      # Start server
python manage.py createsuperuser # Create admin
python manage.py shell           # Django shell
```

### Database

```bash
python manage.py makemigrations  # Create migrations
python manage.py migrate         # Apply migrations
python manage.py showmigrations  # View migration status
```

## 🌐 API Endpoints Quick Reference

| Endpoint                              | Method   | Auth  | Description     |
| ------------------------------------- | -------- | ----- | --------------- |
| `/api/users/register/`                | POST     | No    | Register user   |
| `/api/users/login/`                   | POST     | No    | Login           |
| `/api/users/profile/`                 | GET/PUT  | Yes   | User profile    |
| `/api/users/designers/`               | GET      | No    | List designers  |
| `/api/gallery/designs/`               | GET      | No    | List designs    |
| `/api/gallery/designs/`               | POST     | Yes   | Create design   |
| `/api/gallery/designs/{id}/like/`     | POST     | Yes   | Like/dislike    |
| `/api/gallery/designs/{id}/favorite/` | POST     | Yes   | Toggle favorite |
| `/api/bookings/`                      | GET/POST | Yes   | Manage bookings |
| `/api/bookings/{id}/cancel/`          | POST     | Yes   | Cancel booking  |
| `/api/admin-panel/dashboard/`         | GET      | Admin | Dashboard stats |

## 🎭 User Roles

### Customer

- Browse designs
- Like/dislike designs
- Save favorites
- Book designers
- Leave reviews

### Designer (Requires Admin Approval)

- Upload/manage designs
- Receive bookings
- Respond to reviews
- View statistics

### Admin

- Approve designers
- Moderate designs
- Handle reported reviews
- View analytics

## 📊 Models Overview

### User

- Fields: username, email, role, is_approved, average_rating
- Roles: customer, designer, admin

### Design

- Fields: title, image, category, designer, status, likes_count
- Status: pending, approved, rejected

### Booking

- Fields: customer, designer, booking_date, status
- Status: pending, confirmed, completed, cancelled

### Review

- Fields: customer, designer, rating (1-5), comment
- Features: designer_response, moderation

## 🔐 Authentication Flow

1. User registers → Receives JWT tokens
2. Designer accounts → Need admin approval
3. Access token (5 hours) + Refresh token (1 day)
4. Token auto-refresh on 401 errors

## 💡 Quick Tips

### Create Sample Category

```python
from apps.gallery.models import Category
Category.objects.create(name='Bridal', slug='bridal')
```

### Create Test User

```python
from apps.users.models import User
User.objects.create_user(username='test', password='test123', role='customer')
```

### Approve Designer

```python
user = User.objects.get(username='designer1')
user.is_approved = True
user.save()
```

## 🎨 Frontend TODO

- [ ] Setup React app with routing
- [ ] Implement AuthContext
- [ ] Create API service layer
- [ ] Build authentication pages
- [ ] Design gallery page with filters
- [ ] Create booking system
- [ ] Implement designer dashboard
- [ ] Build admin panel
- [ ] Add responsive styling

## 🚀 Deployment Checklist

- [ ] Set DEBUG=False
- [ ] Update SECRET_KEY
- [ ] Configure PostgreSQL
- [ ] Setup email service
- [ ] Configure ALLOWED_HOSTS
- [ ] Setup static/media serving (AWS S3/Cloudinary)
- [ ] Enable HTTPS
- [ ] Setup CI/CD

## 📱 Access Points

- Backend API: http://localhost:8000
- Django Admin: http://localhost:8000/admin
- Frontend (future): http://localhost:3000

## 🎯 Success Metrics

✅ All backend APIs functional
✅ Database migrations applied
✅ JWT authentication working
✅ Role-based permissions implemented
✅ Admin moderation system ready
✅ Booking workflow complete
✅ Review system with responses
✅ Notification system implemented

---

**Status**: Backend Complete | Frontend Pending
**Tech**: Django + DRF | React + TailwindCSS (planned)
**Database**: SQLite (dev) | PostgreSQL (prod recommended)
