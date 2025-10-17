# 🎨 Mehndi Management System

A comprehensive full-stack web application for managing mehndi (henna) art designs, bookings, and designer portfolios. Built with Django REST Framework and React with TypeScript.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

### For Customers
- 🖼️ **Browse Gallery** - Explore thousands of mehndi designs with advanced filters
- 🔍 **Search & Filter** - Find designs by category, designer, popularity, and more
- ❤️ **Favorites** - Save your favorite designs for later inspiration
- 📅 **Book Appointments** - Schedule bookings with verified designers
- ⭐ **Reviews & Ratings** - Read and write reviews for designers
- 👤 **User Profiles** - Manage your account and view booking history

### For Designers
- 📤 **Upload Designs** - Showcase your portfolio with image uploads
- 📊 **Dashboard** - Track bookings, views, and ratings
- 💬 **Respond to Reviews** - Engage with customer feedback
- 📆 **Manage Bookings** - Accept, confirm, or decline appointments
- 📈 **Analytics** - View profile statistics and performance

### For Admins
- 👥 **User Management** - Approve designers, manage users
- ✅ **Design Approval** - Review and approve uploaded designs
- 🔍 **Content Moderation** - Flag and moderate reviews
- 📊 **Dashboard** - View platform-wide statistics
- 📋 **Booking Oversight** - Monitor all booking activities

## 🛠️ Tech Stack

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework 3.14** - API development
- **SimpleJWT** - JWT authentication
- **Pillow** - Image processing
- **SQLite** - Database (development)
- **Django CORS Headers** - Cross-origin resource sharing
- **Django Filter** - Advanced filtering

### Frontend
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS 3** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **Context API** - State management

## 📁 Project Structure

```
mehndi-management-system/
├── backend/
│   ├── apps/
│   │   ├── users/          # User authentication & profiles
│   │   ├── gallery/        # Designs, categories, reviews
│   │   ├── bookings/       # Booking management
│   │   └── admin_panel/    # Admin operations
│   ├── config/             # Django settings
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── styles/         # Global CSS
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 16+
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/game-changer-01/mehndi_magic.git
   cd mehndi_magic
   ```

2. **Create virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   Frontend will be available at `http://localhost:3000`

## 🔑 Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/users/register/          # Register new user
POST   /api/users/login/             # Login user
POST   /api/users/token/refresh/     # Refresh JWT token
GET    /api/users/me/                # Get current user
PUT    /api/users/profile/           # Update profile
```

### Gallery Endpoints
```
GET    /api/gallery/designs/         # List designs (with filters)
POST   /api/gallery/designs/         # Create design (designers only)
GET    /api/gallery/designs/:id/     # Get design details
PUT    /api/gallery/designs/:id/     # Update design
DELETE /api/gallery/designs/:id/     # Delete design
POST   /api/gallery/designs/:id/like/        # Like/dislike design
POST   /api/gallery/designs/:id/favorite/    # Toggle favorite
GET    /api/gallery/categories/      # List categories
GET    /api/gallery/reviews/         # List reviews
POST   /api/gallery/reviews/         # Create review
```

### Booking Endpoints
```
GET    /api/bookings/               # List user bookings
POST   /api/bookings/               # Create booking
GET    /api/bookings/:id/           # Get booking details
PUT    /api/bookings/:id/           # Update booking
DELETE /api/bookings/:id/cancel/    # Cancel booking
```

### Admin Endpoints
```
GET    /api/admin-panel/dashboard/              # Dashboard stats
GET    /api/admin-panel/users/                  # List users
POST   /api/admin-panel/users/:id/approve/     # Approve designer
DELETE /api/admin-panel/users/:id/             # Delete user
GET    /api/admin-panel/designs/               # List all designs
POST   /api/admin-panel/designs/:id/approve/   # Approve design
POST   /api/admin-panel/designs/:id/reject/    # Reject design
GET    /api/admin-panel/bookings/              # List all bookings
GET    /api/admin-panel/reviews/               # List all reviews
POST   /api/admin-panel/reviews/:id/flag/      # Flag review
DELETE /api/admin-panel/reviews/:id/           # Delete review
```

## 🎯 Key Features Explained

### Authentication System
- JWT-based authentication with access and refresh tokens
- Role-based access control (Customer, Designer, Admin)
- Designer approval workflow
- Protected routes and API endpoints

### Design Gallery
- Advanced filtering (category, designer, status, popularity)
- Search functionality
- Pagination (12 items per page)
- Like/dislike system
- View counter
- Favorites system

### Booking System
- Designer selection with profiles
- Date and time picker with validation
- Event type selection (Wedding, Birthday, etc.)
- Duration and location fields
- Status workflow (Pending → Confirmed → Completed)
- Cancellation with reason

### Admin Panel
- 5-tab interface (Dashboard, Users, Designs, Bookings, Reviews)
- Real-time statistics
- User approval workflow
- Content moderation
- Design approval/rejection
- Review flagging and deletion

### Designer Profiles
- Portfolio showcase (approved designs)
- Reviews and ratings display
- Designer response to reviews
- Statistics (bookings, rating, experience)
- Direct booking integration

### Reviews & Ratings
- 5-star rating system
- Written reviews
- Designer responses
- Review moderation (admin)
- Flag system for inappropriate content

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Deployment

**Backend (Heroku/Railway/etc.)**
```bash
# Install production dependencies
pip install gunicorn whitenoise

# Collect static files
python manage.py collectstatic --noinput

# Run with gunicorn
gunicorn config.wsgi:application
```

**Frontend (Vercel/Netlify/etc.)**
```bash
# Build production bundle
npm run build

# The build folder contains production-ready files
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Game Changer**
- GitHub: [@game-changer-01](https://github.com/game-changer-01)
- Repository: [mehndi_magic](https://github.com/game-changer-01/mehndi_magic)

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- TailwindCSS community
- All contributors and testers

## 📞 Support

For support, open an issue in the repository.

## 🗺️ Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time chat between customers and designers
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] AI-powered design recommendations
- [ ] Social media sharing
- [ ] Calendar integration

---

**Built with ❤️ using Django, React, and TypeScript**
