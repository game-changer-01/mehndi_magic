# 🎨 Mehndi Magic - Complete Guide for Beginners# 🎨 Mehndi Management System



Welcome! This guide will help you understand and run the Mehndi Magic application, even if you're new to programming. 🌟A comprehensive full-stack web application for managing mehndi (henna) art designs, bookings, and designer portfolios. Built with Django REST Framework and React with TypeScript.



---![Status](https://img.shields.io/badge/status-active-success.svg)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 What is Mehndi Magic?

## 🌟 Features

**Mehndi Magic** is a web platform that connects mehndi/henna artists with customers. It's like Uber, but for booking mehndi artists!

### For Customers

### 👥 Who Uses It?- 🖼️ **Browse Gallery** - Explore thousands of mehndi designs with advanced filters

- 🔍 **Search & Filter** - Find designs by category, designer, popularity, and more

1. **Customers** - People who want to book mehndi artists for events (weddings, parties, etc.)- ❤️ **Favorites** - Save your favorite designs for later inspiration

2. **Designers** - Mehndi artists who showcase their work and accept bookings- 📅 **Book Appointments** - Schedule bookings with verified designers

3. **Admins** - Platform managers who oversee everything- ⭐ **Reviews & Ratings** - Read and write reviews for designers

- 👤 **User Profiles** - Manage your account and view booking history

### ✨ Main Features

### For Designers

- 🎨 **Design Gallery** - Browse beautiful mehndi designs- 📤 **Upload Designs** - Showcase your portfolio with image uploads

- 📅 **Booking System** - Book artists for events- 📊 **Dashboard** - Track bookings, views, and ratings

- ⭐ **Reviews & Ratings** - Rate and review artists- 💬 **Respond to Reviews** - Engage with customer feedback

- ❤️ **Favorites** - Save designs you love- 📆 **Manage Bookings** - Accept, confirm, or decline appointments

- 👤 **Designer Profiles** - View artist portfolios- 📈 **Analytics** - View profile statistics and performance

- 👑 **Admin Dashboard** - Manage users, designs, and bookings

### For Admins

---- 👥 **User Management** - Approve designers, manage users

- ✅ **Design Approval** - Review and approve uploaded designs

## 🏗️ How is it Built?- 🔍 **Content Moderation** - Flag and moderate reviews

- 📊 **Dashboard** - View platform-wide statistics

This application has TWO parts that work together:- 📋 **Booking Oversight** - Monitor all booking activities



### 1️⃣ Backend (The Brain) 🧠## 🛠️ Tech Stack

- **Location:** `backend/` folder

- **Technology:** Python with Django### Backend

- **What it does:**- **Django 4.2** - Python web framework

  - Stores all data (users, designs, bookings)- **Django REST Framework 3.14** - API development

  - Handles login and security- **SimpleJWT** - JWT authentication

  - Processes requests from the frontend- **Pillow** - Image processing

  - Manages file uploads (images)- **SQLite** - Database (development)

- **Runs on:** `http://localhost:8000`- **Django CORS Headers** - Cross-origin resource sharing

- **Django Filter** - Advanced filtering

### 2️⃣ Frontend (The Face) 👤

- **Location:** `frontend/` folder### Frontend

- **Technology:** React with TypeScript- **React 18** - UI library

- **What it does:**- **TypeScript 5** - Type-safe JavaScript

  - Shows the website users see- **React Router v6** - Client-side routing

  - Handles user interactions (clicks, forms)- **Axios** - HTTP client

  - Displays data from backend- **TailwindCSS 3** - Utility-first CSS framework

  - Makes the site look beautiful- **React Hot Toast** - Toast notifications

- **Runs on:** `http://localhost:3000`- **Context API** - State management



### How They Talk to Each Other## 📁 Project Structure



``````

User clicks "Book Designer" buttonmehndi-management-system/

         ↓├── backend/

Frontend sends request to Backend│   ├── apps/

         ↓│   │   ├── users/          # User authentication & profiles

Backend processes request│   │   ├── gallery/        # Designs, categories, reviews

         ↓│   │   ├── bookings/       # Booking management

Backend saves booking to database│   │   └── admin_panel/    # Admin operations

         ↓│   ├── config/             # Django settings

Backend sends success response│   ├── manage.py

         ↓│   └── requirements.txt

Frontend shows "Booking successful!" message├── frontend/

```│   ├── src/

│   │   ├── components/     # Reusable UI components

---│   │   ├── pages/          # Page components

│   │   ├── services/       # API service layer

## 🚀 Complete Setup Guide (Step by Step)│   │   ├── context/        # React Context providers

│   │   ├── hooks/          # Custom React hooks

### Before You Start│   │   ├── types/          # TypeScript type definitions

│   │   └── styles/         # Global CSS

Make sure you have these installed on your computer:│   ├── public/

│   ├── package.json

| Software | Check if Installed | Download Link |│   └── tsconfig.json

|----------|-------------------|---------------|├── docker-compose.yml

| **Python 3.10+** | Open terminal, type: `python --version` | [Download Python](https://www.python.org/downloads/) |└── README.md

| **Node.js 16+** | Open terminal, type: `node --version` | [Download Node.js](https://nodejs.org/) |```

| **Git** | Type: `git --version` | [Download Git](https://git-scm.com/) |

| **Code Editor** | - | [Download VS Code](https://code.visualstudio.com/) |## 🚀 Getting Started



---### Prerequisites

- Python 3.10+

## 📥 Step 1: Get the Code- Node.js 16+

- npm or yarn

### Option A: Clone from GitHub (Recommended)- Git



```bash### Backend Setup

# Open your terminal/command prompt

# Navigate to where you want the project1. **Clone the repository**

cd Desktop   ```bash

   git clone https://github.com/game-changer-01/mehndi_magic.git

# Clone the repository   cd mehndi_magic

git clone https://github.com/game-changer-01/mehndi_magic.git   ```



# Go into the project folder2. **Create virtual environment**

cd mehndi_magic   ```bash

```   cd backend

   python -m venv venv

### Option B: Download ZIP   

   # Windows

1. Go to: https://github.com/game-changer-01/mehndi_magic   venv\Scripts\activate

2. Click green "Code" button   

3. Click "Download ZIP"   # macOS/Linux

4. Extract the ZIP file   source venv/bin/activate

5. Open terminal in the extracted folder   ```



---3. **Install dependencies**

   ```bash

## 🔧 Step 2: Setup Backend (Python/Django)   pip install -r requirements.txt

   ```

### Windows Instructions:

4. **Run migrations**

```bash   ```bash

# 1. Go to backend folder   python manage.py makemigrations

cd backend   python manage.py migrate

   ```

# 2. Create virtual environment

python -m venv venv5. **Create superuser**

   ```bash

# 3. Activate virtual environment   python manage.py createsuperuser

venv\Scripts\activate   ```



# 4. Install packages (this takes a few minutes)6. **Run development server**

pip install -r requirements.txt   ```bash

   python manage.py runserver

# 5. Setup database   ```

python manage.py migrate

   Backend will be available at `http://localhost:8000`

# 6. Create admin account

python manage.py createsuperuser### Frontend Setup

# Enter: username (e.g., admin)

# Enter: email (e.g., admin@example.com)1. **Navigate to frontend directory**

# Enter: password (e.g., admin123)   ```bash

   cd ../frontend

# 7. Start backend server   ```

python manage.py runserver

```2. **Install dependencies**

   ```bash

### Mac/Linux Instructions:   npm install

   ```

```bash

# 1. Go to backend folder3. **Start development server**

cd backend   ```bash

   npm start

# 2. Create virtual environment   ```

python3 -m venv venv

   Frontend will be available at `http://localhost:3000`

# 3. Activate virtual environment

source venv/bin/activate## 🔑 Environment Variables



# 4. Install packages### Backend (.env)

pip install -r requirements.txtCreate a `.env` file in the `backend` directory:

```env

# 5. Setup databaseSECRET_KEY=your-secret-key-here

python manage.py migrateDEBUG=True

ALLOWED_HOSTS=localhost,127.0.0.1

# 6. Create admin accountDATABASE_URL=sqlite:///db.sqlite3

python manage.py createsuperuser```



# 7. Start backend server### Frontend (.env)

python manage.py runserverCreate a `.env` file in the `frontend` directory:

``````env

REACT_APP_API_URL=http://localhost:8000/api

✅ **Backend is running!** You should see:```

```

Starting development server at http://127.0.0.1:8000/## 📚 API Documentation

```

### Authentication Endpoints

**Keep this terminal open!** The backend needs to keep running.```

POST   /api/users/register/          # Register new user

---POST   /api/users/login/             # Login user

POST   /api/users/token/refresh/     # Refresh JWT token

## 🎨 Step 3: Setup Frontend (React/TypeScript)GET    /api/users/me/                # Get current user

PUT    /api/users/profile/           # Update profile

### Open a NEW Terminal Window```



**Windows:**### Gallery Endpoints

- Press `Ctrl + Shift + P` in VS Code```

- Type "New Terminal"GET    /api/gallery/designs/         # List designs (with filters)

- Or right-click in VS Code and select "New Terminal"POST   /api/gallery/designs/         # Create design (designers only)

GET    /api/gallery/designs/:id/     # Get design details

**Mac/Linux:**PUT    /api/gallery/designs/:id/     # Update design

- Press `Cmd + Shift + P` in VS CodeDELETE /api/gallery/designs/:id/     # Delete design

- Type "New Terminal"POST   /api/gallery/designs/:id/like/        # Like/dislike design

POST   /api/gallery/designs/:id/favorite/    # Toggle favorite

### Run These Commands:GET    /api/gallery/categories/      # List categories

GET    /api/gallery/reviews/         # List reviews

```bashPOST   /api/gallery/reviews/         # Create review

# 1. Go to frontend folder (from project root)```

cd frontend

### Booking Endpoints

# 2. Install packages (this takes a few minutes)```

npm installGET    /api/bookings/               # List user bookings

POST   /api/bookings/               # Create booking

# 3. Start frontend serverGET    /api/bookings/:id/           # Get booking details

npm startPUT    /api/bookings/:id/           # Update booking

```DELETE /api/bookings/:id/cancel/    # Cancel booking

```

✅ **Frontend is running!** Your browser should automatically open to `http://localhost:3000`

### Admin Endpoints

If it doesn't open automatically, visit: http://localhost:3000```

GET    /api/admin-panel/dashboard/              # Dashboard stats

---GET    /api/admin-panel/users/                  # List users

POST   /api/admin-panel/users/:id/approve/     # Approve designer

## 🎉 Step 4: Test the ApplicationDELETE /api/admin-panel/users/:id/             # Delete user

GET    /api/admin-panel/designs/               # List all designs

Now you have BOTH servers running:POST   /api/admin-panel/designs/:id/approve/   # Approve design

- ✅ Backend: `http://localhost:8000`POST   /api/admin-panel/designs/:id/reject/    # Reject design

- ✅ Frontend: `http://localhost:3000`GET    /api/admin-panel/bookings/              # List all bookings

GET    /api/admin-panel/reviews/               # List all reviews

### Test These Features:POST   /api/admin-panel/reviews/:id/flag/      # Flag review

DELETE /api/admin-panel/reviews/:id/           # Delete review

1. **Homepage** → Should see the landing page```

2. **Register** → Click "Sign Up" and create a customer account

3. **Login** → Login with your new account## 🎯 Key Features Explained

4. **Gallery** → Browse designs

5. **Admin Panel** → Visit `http://localhost:8000/admin/` with superuser credentials### Authentication System

- JWT-based authentication with access and refresh tokens

---- Role-based access control (Customer, Designer, Admin)

- Designer approval workflow

## 📂 Project Structure Overview- Protected routes and API endpoints



```### Design Gallery

mehndi-management-system/- Advanced filtering (category, designer, status, popularity)

│- Search functionality

├── backend/                    # Backend application (Python/Django)- Pagination (12 items per page)

│   ├── apps/                  # Django apps (users, gallery, bookings, admin)- Like/dislike system

│   ├── config/                # Django settings- View counter

│   ├── media/                 # Uploaded images- Favorites system

│   ├── db.sqlite3            # Database file

│   ├── manage.py             # Django command tool### Booking System

│   ├── requirements.txt      # Python packages- Designer selection with profiles

│   └── README.md             # 📚 Backend documentation (read this!)- Date and time picker with validation

│- Event type selection (Wedding, Birthday, etc.)

├── frontend/                   # Frontend application (React/TypeScript)- Duration and location fields

│   ├── public/               # Static files- Status workflow (Pending → Confirmed → Completed)

│   ├── src/                  # Source code- Cancellation with reason

│   │   ├── components/       # Reusable UI components

│   │   ├── pages/           # Full page components### Admin Panel

│   │   ├── services/        # API communication- 5-tab interface (Dashboard, Users, Designs, Bookings, Reviews)

│   │   ├── context/         # State management- Real-time statistics

│   │   └── types/           # TypeScript types- User approval workflow

│   ├── package.json         # Node packages- Content moderation

│   └── README.md            # 📚 Frontend documentation (read this!)- Design approval/rejection

│- Review flagging and deletion

├── docker-compose.yml        # Docker setup (optional)

└── README.md                # 📚 This file!### Designer Profiles

```- Portfolio showcase (approved designs)

- Reviews and ratings display

> **📖 Important:** Check `backend/README.md` and `frontend/README.md` for detailed documentation!- Designer response to reviews

- Statistics (bookings, rating, experience)

---- Direct booking integration



## 🎯 User Roles & What They Can Do### Reviews & Ratings

- 5-star rating system

### 👤 Customer- Written reviews

- Browse designs- Designer responses

- Search and filter- Review moderation (admin)

- Book designers- Flag system for inappropriate content

- Favorite designs

- Leave reviews## 🧪 Testing

- View bookings

### Backend Tests

### 🎨 Designer```bash

- Upload designscd backend

- Manage portfoliopython manage.py test

- View booking requests```

- Accept/reject bookings

- Respond to reviews### Frontend Tests

- Update profile```bash

cd frontend

### 👑 Adminnpm test

- View dashboard stats```

- Approve/reject designers

- Approve/reject designs## 📦 Deployment

- View all bookings

- Moderate reviews### Using Docker Compose

- Manage users```bash

docker-compose up -d

---```



## 🔐 Important URLs### Manual Deployment



| URL | Description | Credentials |**Backend (Heroku/Railway/etc.)**

|-----|-------------|-------------|```bash

| `http://localhost:3000` | Main website | Register new account |# Install production dependencies

| `http://localhost:8000/admin/` | Django admin panel | Superuser (created in setup) |pip install gunicorn whitenoise

| `http://localhost:8000/api/` | API endpoints | Requires authentication |

# Collect static files

---python manage.py collectstatic --noinput



## 🛠️ Common Tasks# Run with gunicorn

gunicorn config.wsgi:application

### Starting the Application (After First Setup)```



**Every time you want to run the app:****Frontend (Vercel/Netlify/etc.)**

```bash

1. **Start Backend:**# Build production bundle

   ```bashnpm run build

   cd backend

   venv\Scripts\activate       # Windows# The build folder contains production-ready files

   source venv/bin/activate    # Mac/Linux```

   python manage.py runserver

   ```## 🤝 Contributing



2. **Start Frontend (new terminal):**Contributions are welcome! Please follow these steps:

   ```bash

   cd frontend1. Fork the repository

   npm start2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

   ```3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

### Stopping the Application5. Open a Pull Request



- Press `Ctrl + C` in each terminal## 📄 License

- Close the terminal windows

This project is licensed under the MIT License - see the LICENSE file for details.

### Creating Test Data

## 👨‍💻 Author

**Option 1: Using Django Admin**

1. Go to `http://localhost:8000/admin/`**Game Changer**

2. Login with superuser- GitHub: [@game-changer-01](https://github.com/game-changer-01)

3. Manually add users, designs, categories, etc.- Repository: [mehndi_magic](https://github.com/game-changer-01/mehndi_magic)



**Option 2: Using API**## 🙏 Acknowledgments

- Use Postman or Thunder Client

- Send POST requests to API endpoints- Django REST Framework documentation

- See API documentation in `backend/README.md`- React documentation

- TailwindCSS community

---- All contributors and testers



## 🐛 Troubleshooting## 📞 Support



### Problem: "python is not recognized"For support, open an issue in the repository.

**Solution:** Python is not installed or not in PATH

- Install Python from https://python.org## 🗺️ Roadmap

- During installation, check "Add Python to PATH"

- [ ] Payment integration (Stripe/PayPal)

### Problem: "npm is not recognized"- [ ] Real-time chat between customers and designers

**Solution:** Node.js is not installed- [ ] Email notifications

- Install Node.js from https://nodejs.org- [ ] SMS reminders

- [ ] Advanced analytics dashboard

### Problem: "Port 8000 already in use"- [ ] Mobile app (React Native)

**Solution:** Another program is using port 8000- [ ] Multi-language support

```bash- [ ] AI-powered design recommendations

# Use a different port- [ ] Social media sharing

python manage.py runserver 8001- [ ] Calendar integration

```

Then update frontend's API URL in `frontend/src/services/api.ts`---



### Problem: "Port 3000 already in use"**Built with ❤️ using Django, React, and TypeScript**

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Problem: "Module not found" or "Package not found"
**Solution:**
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

### Problem: "Database errors"
**Solution:** Reset database
```bash
cd backend
python manage.py flush          # Clear all data
python manage.py migrate        # Recreate tables
python manage.py createsuperuser  # Create admin again
```

### Problem: "CORS errors" in browser console
**Solution:** Make sure backend is running and CORS is configured
- Check `backend/config/settings.py`
- Verify `CORS_ALLOWED_ORIGINS` includes `http://localhost:3000`

### Problem: "categories.map is not a function"
**Solution:** This was a bug in Gallery.tsx - now fixed! The app ensures categories is always an array.

---

## 📚 Learning Resources

### For Backend (Python/Django):
- [Python Tutorial](https://www.python.org/about/gettingstarted/)
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)

### For Frontend (React/TypeScript):
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### General Web Development:
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [W3Schools](https://www.w3schools.com/)

---

## 🚀 Next Steps

Once you have the app running:

1. **Explore the code:**
   - Read `backend/README.md` for backend details
   - Read `frontend/README.md` for frontend details

2. **Add features:**
   - Try adding a new page
   - Create a new API endpoint
   - Customize the design

3. **Deploy online:**
   - Backend: Heroku, Railway, DigitalOcean
   - Frontend: Vercel, Netlify, GitHub Pages

---

## 🤝 Contributing

Want to improve this project?

1. Fork the repository
2. Create a new branch: `git checkout -b my-feature`
3. Make your changes
4. Test everything works
5. Commit: `git commit -m "Add my feature"`
6. Push: `git push origin my-feature`
7. Create a Pull Request on GitHub

---

## 📧 Need Help?

- **Check the documentation** in backend and frontend README files
- **Google the error message** - copy/paste it into Google
- **Ask on Stack Overflow** - tag with [django], [react], [typescript]
- **Read the error messages carefully** - they often tell you exactly what's wrong

---

## 📄 License

This project is open source under the MIT License. Feel free to use, modify, and share!

---

## 👨‍💻 Author

**Game Changer**
- GitHub: [@game-changer-01](https://github.com/game-changer-01)
- Repository: [mehndi_magic](https://github.com/game-changer-01/mehndi_magic)

---

## ✨ Final Tips for Beginners

1. **Don't panic!** Every developer faces errors. It's normal.
2. **Read error messages carefully** - they guide you to the problem
3. **Google is your friend** - search any error you encounter
4. **Take breaks** - fresh eyes catch bugs faster
5. **Experiment!** - change code and see what happens
6. **Ask for help** - no question is too basic
7. **Celebrate small wins** - got it working? That's progress! 🎉

---

**Good luck with your coding journey! 🚀**

Remember: Every expert was once a beginner who never gave up.
