# 🎨 Mehndi Magic - Backend Documentation

## 📖 What is This?

This is the **backend** (server-side) of the Mehndi Magic application. Think of it as the brain of the application that:
- Stores all the data (users, designs, bookings, reviews)
- Handles user login and security
- Provides data to the frontend (the website users see)
- Manages file uploads (images)

Built with **Django** and **Django REST Framework** - popular Python frameworks for building web applications.

---

## 🛠️ Technologies Used

| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **Python 3.10+** | Programming Language | Easy to learn, powerful for web development |
| **Django 4.2** | Web Framework | Handles URLs, databases, and server logic |
| **Django REST Framework** | API Framework | Creates APIs that frontend can talk to |
| **SQLite** | Database | Stores all data (users, designs, bookings, etc.) |
| **JWT** | Authentication | Secure token-based login system |
| **Pillow** | Image Processing | Handles uploaded images |

---

## 📁 Project Structure Explained

```
backend/
│
├── apps/                          # All app modules
│   ├── users/                     # User management
│   │   ├── models.py             # User database structure
│   │   ├── views.py              # User logic (register, login, etc.)
│   │   ├── serializers.py        # Convert data to/from JSON
│   │   └── urls.py               # User-related URLs
│   │
│   ├── gallery/                   # Design gallery
│   │   ├── models.py             # Design & Category database
│   │   ├── views.py              # Design logic (upload, list, etc.)
│   │   └── urls.py               # Gallery URLs
│   │
│   ├── bookings/                  # Booking system
│   │   ├── models.py             # Booking database structure
│   │   ├── views.py              # Booking logic
│   │   └── urls.py               # Booking URLs
│   │
│   └── admin_panel/               # Admin features
│       ├── views.py              # Admin dashboard & management
│       └── urls.py               # Admin URLs
│
├── config/                        # Project configuration
│   ├── settings.py               # All settings (database, apps, etc.)
│   ├── urls.py                   # Main URL routing
│   └── wsgi.py                   # Web server configuration
│
├── media/                         # Uploaded files (images)
├── db.sqlite3                    # Database file
├── manage.py                     # Django command tool
├── requirements.txt              # Python packages needed
└── Dockerfile                    # Docker container setup
```

---

## 🚀 Getting Started (Step-by-Step)

### Prerequisites

Before you start, make sure you have:
- **Python 3.10 or higher** installed ([Download here](https://www.python.org/downloads/))
- **pip** (comes with Python)
- A code editor (VS Code recommended)
- A terminal/command prompt

### Step 1: Navigate to Backend Folder

```bash
# Open your terminal and go to the backend folder
cd backend
```

### Step 2: Create a Virtual Environment

A virtual environment keeps this project's packages separate from other Python projects.

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

✅ You'll see `(venv)` at the start of your terminal line when activated.

### Step 3: Install Required Packages

```bash
pip install -r requirements.txt
```

This installs all the Python packages listed in `requirements.txt`.

### Step 4: Set Up the Database

Django needs to create database tables:

```bash
# Create all database tables
python manage.py migrate
```

### Step 5: Create an Admin User

Create a superuser account to access the admin panel:

```bash
python manage.py createsuperuser
```

You'll be asked for:
- Username (e.g., `admin`)
- Email (e.g., `admin@example.com`)
- Password (e.g., `admin123`)

### Step 6: Start the Server

```bash
python manage.py runserver
```

✅ **Server is running!** Visit: `http://localhost:8000`

---

## 🔑 Important URLs

| URL | Description |
|-----|-------------|
| `http://localhost:8000/admin/` | Django admin panel (use superuser credentials) |
| `http://localhost:8000/api/users/` | User-related endpoints |
| `http://localhost:8000/api/gallery/` | Design gallery endpoints |
| `http://localhost:8000/api/bookings/` | Booking endpoints |
| `http://localhost:8000/api/admin-panel/` | Admin management endpoints |

---

## 📚 API Endpoints Documentation

### 🔐 Authentication Endpoints

#### Register a New User
- **URL:** `POST /api/users/register/`
- **What it does:** Creates a new user account
- **Required data:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer"
  }
  ```

#### Login
- **URL:** `POST /api/users/login/`
- **What it does:** Logs in a user and returns authentication tokens
- **Required data:**
  ```json
  {
    "username": "johndoe",
    "password": "securepassword123"
  }
  ```
- **Returns:**
  ```json
  {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": { /* user details */ }
  }
  ```

#### Get Current User Profile
- **URL:** `GET /api/users/profile/`
- **What it does:** Gets the logged-in user's details
- **Requires:** Authentication token in headers

---

### 🎨 Gallery Endpoints

#### Get All Designs
- **URL:** `GET /api/gallery/designs/`
- **What it does:** Lists all approved designs
- **Optional filters:**
  - `?category=1` - Filter by category ID
  - `?designer=5` - Filter by designer ID
  - `?search=bridal` - Search in title/tags
  - `?ordering=-created_at` - Sort by newest

#### Get Single Design
- **URL:** `GET /api/gallery/designs/{id}/`
- **What it does:** Gets details of one design
- **Example:** `/api/gallery/designs/5/`

#### Upload a Design (Designer Only)
- **URL:** `POST /api/gallery/designs/`
- **What it does:** Designer uploads a new design
- **Required data:** (multipart/form-data)
  - `title`: Design name
  - `description`: Description
  - `category`: Category ID
  - `image`: Image file
  - `tags`: Comma-separated tags

#### Get Categories
- **URL:** `GET /api/gallery/categories/`
- **What it does:** Lists all design categories

---

### 📅 Booking Endpoints

#### Create a Booking
- **URL:** `POST /api/bookings/bookings/`
- **What it does:** Customer books a designer
- **Required data:**
  ```json
  {
    "designer": 5,
    "date": "2025-10-25",
    "time": "14:00:00",
    "occasion": "Wedding",
    "guests_count": 10,
    "location": "123 Main Street, City",
    "notes": "Please bring natural henna"
  }
  ```

#### Get My Bookings
- **URL:** `GET /api/bookings/bookings/`
- **What it does:** Lists your bookings (customer or designer view)

#### Update Booking Status (Designer Only)
- **URL:** `PATCH /api/bookings/bookings/{id}/`
- **What it does:** Designer accepts/rejects booking
- **Data:**
  ```json
  {
    "status": "confirmed"
  }
  ```
  Status options: `pending`, `confirmed`, `completed`, `cancelled`

---

### 👑 Admin Panel Endpoints

#### Dashboard Statistics
- **URL:** `GET /api/admin-panel/dashboard/`
- **What it does:** Gets counts and statistics for admin
- **Returns:**
  ```json
  {
    "total_users": 150,
    "pending_designer_approvals": 5,
    "total_designs": 320,
    "total_bookings": 89,
    "pending_bookings": 12
  }
  ```

#### Manage Users
- **URL:** `GET /api/admin-panel/users/`
- **What it does:** Lists all users with filters
- **Filters:** `?role=designer`, `?is_approved=false`

#### Approve Designer
- **URL:** `POST /api/admin-panel/users/{id}/approve/`
- **What it does:** Approves a designer account

#### Manage Designs
- **URL:** `GET /api/admin-panel/designs/`
- **What it does:** Lists all designs (pending, approved, rejected)

#### Approve/Reject Design
- **URL:** `POST /api/admin-panel/designs/{id}/approve/`
- **URL:** `POST /api/admin-panel/designs/{id}/reject/`
- **What it does:** Approves or rejects a design
- **Data for reject:**
  ```json
  {
    "rejection_reason": "Image quality is too low"
  }
  ```

---

## 🗃️ Database Models Explained

### User Model
Stores user information with roles:
- **Fields:** username, email, password, first_name, last_name, role, bio, phone, profile_picture
- **Roles:** customer, designer, admin
- **Designer extras:** is_approved, years_of_experience, hourly_rate, availability

### Design Model
Stores design images and details:
- **Fields:** title, description, image, category, designer, tags, status, likes_count, views_count
- **Status:** pending, approved, rejected

### Category Model
Groups designs:
- **Fields:** name, description, designs_count

### Booking Model
Stores booking requests:
- **Fields:** customer, designer, date, time, occasion, guests_count, location, status, notes
- **Status:** pending, confirmed, completed, cancelled

### Review Model
Stores customer reviews:
- **Fields:** customer, designer, booking, rating (1-5), comment, designer_response

### Favorite Model
Stores user's favorite designs:
- **Fields:** user, design

---

## 🔒 Authentication & Permissions

### How Authentication Works

1. **User registers** → Account created in database
2. **User logs in** → Server creates JWT tokens (access + refresh)
3. **User makes requests** → Frontend sends access token in headers
4. **Server verifies** → Checks token and allows/denies request

### Permission Levels

| Permission | Who Has It | What They Can Do |
|-----------|-----------|------------------|
| **IsAuthenticated** | Logged-in users | View profile, make bookings |
| **IsDesigner** | Designers only | Upload designs, manage bookings |
| **IsCustomer** | Customers only | Book designers, leave reviews |
| **IsAdminUser** | Admins only | Manage users, approve designs |

---

## 🧪 Testing the API

### Using Django Admin Panel

1. Go to `http://localhost:8000/admin/`
2. Login with your superuser credentials
3. You can:
   - View all users, designs, bookings
   - Add/edit/delete records
   - Test data relationships

### Using Postman or Thunder Client

1. **Install Postman** or use VS Code's Thunder Client extension
2. **Create a new request**
3. **Example: Register a user**
   - Method: POST
   - URL: `http://localhost:8000/api/users/register/`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "test123",
       "first_name": "Test",
       "last_name": "User",
       "role": "customer"
     }
     ```
4. **Click Send** → You should get a success response

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found"
**Solution:** Make sure you activated the virtual environment and installed packages:
```bash
pip install -r requirements.txt
```

### Issue: "Port already in use"
**Solution:** Stop other Django servers or use a different port:
```bash
python manage.py runserver 8001
```

### Issue: "No such table"
**Solution:** Run migrations:
```bash
python manage.py migrate
```

### Issue: "Permission denied"
**Solution:** Make sure you're logged in and sending the access token:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 📝 Useful Commands

```bash
# Activate virtual environment
venv\Scripts\activate              # Windows
source venv/bin/activate           # Mac/Linux

# Install packages
pip install -r requirements.txt

# Database commands
python manage.py makemigrations    # Create migration files
python manage.py migrate           # Apply migrations
python manage.py flush             # Clear database (careful!)

# User management
python manage.py createsuperuser   # Create admin user
python manage.py changepassword username  # Change password

# Run server
python manage.py runserver         # Default: http://localhost:8000
python manage.py runserver 8001    # Custom port

# Django shell (test code)
python manage.py shell

# Create new app
python manage.py startapp app_name
```

---

## 🚢 Deployment (Production)

### Environment Variables

Create a `.env` file in the backend folder:

```env
SECRET_KEY=your-very-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgres://user:pass@host:port/dbname
```

### Steps for Deployment

1. **Update settings.py:**
   - Set `DEBUG = False`
   - Configure `ALLOWED_HOSTS`
   - Use PostgreSQL instead of SQLite

2. **Collect static files:**
   ```bash
   python manage.py collectstatic
   ```

3. **Use a production server:**
   - Gunicorn (recommended)
   - uWSGI

4. **Deploy to:**
   - **Heroku** (easiest for beginners)
   - **DigitalOcean**
   - **AWS**
   - **Railway**

---

## 🤝 Contributing

Want to add features or fix bugs?

1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature-name`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit:** `git commit -m "Add feature description"`
6. **Push:** `git push origin feature-name`
7. **Create a Pull Request**

---

## 📧 Need Help?

- **Django Documentation:** https://docs.djangoproject.com/
- **DRF Documentation:** https://www.django-rest-framework.org/
- **Python Tutorial:** https://www.python.org/about/gettingstarted/

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**

If you're stuck, don't worry - every developer faces issues. Google the error message, check Stack Overflow, and keep trying!
