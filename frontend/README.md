# 🎨 Mehndi Magic - Frontend Documentation

## 📖 What is This?

This is the **frontend** (client-side/user interface) of the Mehndi Magic application. Think of it as the visual part that users see and interact with:
- The website design and layout
- Buttons, forms, and navigation
- Displays data from the backend
- Handles user interactions

Built with **React** and **TypeScript** - modern frameworks for building interactive websites.

---

## 🛠️ Technologies Used

| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **React 18** | UI Library | Builds interactive user interfaces |
| **TypeScript** | Programming Language | JavaScript with type safety (fewer bugs) |
| **TailwindCSS** | CSS Framework | Fast, beautiful styling |
| **React Router** | Navigation | Handles page navigation |
| **Axios** | HTTP Client | Talks to backend API |
| **React Hot Toast** | Notifications | Shows success/error messages |

---

## 📁 Project Structure Explained

```
frontend/
│
├── public/                        # Static files
│   └── index.html                # Main HTML file
│
├── src/                          # Source code
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.tsx           # Top navigation bar
│   │   ├── Footer.tsx           # Bottom footer
│   │   ├── DesignCard.tsx       # Design display card
│   │   ├── ImageUpload.tsx      # Image upload with preview
│   │   ├── RatingStars.tsx      # Star rating display
│   │   ├── ReviewForm.tsx       # Submit review form
│   │   ├── ReviewsList.tsx      # List of reviews
│   │   └── ProtectedRoute.tsx   # Route protection
│   │
│   ├── pages/                    # Full page components
│   │   ├── Home.tsx             # Homepage
│   │   ├── Gallery.tsx          # Design gallery
│   │   ├── Booking.tsx          # Booking page
│   │   ├── Favorites.tsx        # Favorite designs
│   │   ├── AdminPanel.tsx       # Admin dashboard
│   │   ├── DesignerProfile.tsx  # Designer profiles
│   │   └── Auth/                # Login & Register
│   │
│   ├── services/                 # API communication
│   │   ├── api.ts               # Axios setup
│   │   ├── auth.ts              # Authentication
│   │   ├── designs.ts           # Design operations
│   │   ├── bookings.ts          # Booking operations
│   │   ├── favorites.ts         # Favorites operations
│   │   └── admin.ts             # Admin operations
│   │
│   ├── context/                  # State management
│   │   └── AuthContext.tsx      # User authentication state
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useAuth.ts           # Authentication hook
│   │
│   ├── types/                    # TypeScript types
│   │   └── index.ts             # All type definitions
│   │
│   ├── styles/                   # CSS files
│   │   └── index.css            # Global styles
│   │
│   ├── App.tsx                   # Main app component
│   └── index.tsx                # Entry point
│
├── package.json                  # Project dependencies
├── tsconfig.json                # TypeScript config
└── tailwind.config.js           # TailwindCSS config
```

---

## 🚀 Getting Started (Step-by-Step)

### Prerequisites

Before you start, make sure you have:
- **Node.js 16 or higher** installed ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- A terminal/command prompt
- **Backend must be running** on `http://localhost:8000`

### Step 1: Navigate to Frontend Folder

```bash
# Open your terminal and go to the frontend folder
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all the packages listed in `package.json`. It might take a few minutes.

### Step 3: Configure API URL (Optional)

The frontend talks to the backend at `http://localhost:8000` by default.

If your backend is on a different URL, update `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8000'; // Change this if needed
```

### Step 4: Start the Development Server

```bash
npm start
```

✅ **Frontend is running!** 
- Automatically opens: `http://localhost:3000`
- Hot reload enabled (changes appear instantly)

---

## 🎯 How the Frontend Works

### 1. **User Opens Website**
   - `index.tsx` loads first
   - Renders `App.tsx`
   - `AuthContext` checks if user is logged in

### 2. **Routing**
   - `App.tsx` defines all routes
   - React Router shows the correct page
   - Example: `/gallery` → Shows `Gallery.tsx`

### 3. **Data Flow**
   ```
   User clicks button
        ↓
   Component calls service function
        ↓
   Service makes HTTP request to backend
        ↓
   Backend sends data
        ↓
   Service returns data
        ↓
   Component updates state
        ↓
   UI re-renders with new data
   ```

---

## 📄 Pages Explained

### 🏠 Home Page (`pages/Home.tsx`)
- **What it shows:** Landing page with hero section, features, popular designs
- **Who can access:** Everyone
- **Features:**
  - Hero banner with call-to-action
  - Featured designs
  - Category showcase
  - Designer highlights

### 🎨 Gallery Page (`pages/Gallery.tsx`)
- **What it shows:** All approved designs
- **Who can access:** Everyone
- **Features:**
  - Search by title/tags
  - Filter by category
  - Filter by designer
  - Sort options (newest, popular, etc.)
  - Pagination (12 designs per page)
  - Click design to view details

### 📅 Booking Page (`pages/Booking.tsx`)
- **What it shows:** Form to book a designer
- **Who can access:** Logged-in customers
- **Features:**
  - Select designer
  - Choose date & time
  - Enter event details
  - Location and notes
  - Submit booking request

### ❤️ Favorites Page (`pages/Favorites.tsx`)
- **What it shows:** User's saved favorite designs
- **Who can access:** Logged-in users
- **Features:**
  - Grid of favorite designs
  - Remove from favorites
  - Pagination
  - Empty state message

### 👤 Designer Profile (`pages/DesignerProfile.tsx`)
- **What it shows:** Designer's portfolio and info
- **Who can access:** Everyone
- **Features:**
  - Designer bio and stats
  - Portfolio tab (their designs)
  - Reviews tab (customer reviews)
  - "Book Now" button
  - Average rating display

### 👑 Admin Panel (`pages/AdminPanel.tsx`)
- **What it shows:** Admin dashboard
- **Who can access:** Admins only
- **Features:**
  - **Dashboard:** Statistics overview
  - **Users:** Approve designers, manage accounts
  - **Designs:** Approve/reject submissions
  - **Bookings:** View all bookings
  - **Reviews:** Moderate reviews

### 🔐 Login/Register (`pages/Auth/`)
- **What it shows:** Authentication forms
- **Who can access:** Not logged-in users
- **Features:**
  - Login with username/password
  - Register new account
  - Role selection (customer/designer)
  - Form validation
  - Redirect after login

---

## 🧩 Components Explained

### Navbar (`components/Navbar.tsx`)
- **Purpose:** Top navigation bar
- **Features:**
  - Logo and branding
  - Navigation links (Home, Gallery, Booking, etc.)
  - User menu (Profile, Logout)
  - Login/Register buttons (when not logged in)
  - Mobile responsive hamburger menu

### DesignCard (`components/DesignCard.tsx`)
- **Purpose:** Display a single design
- **Shows:**
  - Design image
  - Title
  - Designer name
  - Like count
  - View count
  - Category
- **Actions:**
  - Click to view details
  - Heart icon to favorite/unfavorite

### ImageUpload (`components/ImageUpload.tsx`)
- **Purpose:** Upload images with drag-and-drop
- **Features:**
  - Drag and drop files
  - Click to select file
  - Image preview
  - File validation (type, size)
  - Change/remove uploaded image

### RatingStars (`components/RatingStars.tsx`)
- **Purpose:** Display or select star ratings
- **Modes:**
  - **Display:** Shows rating (e.g., 4.5 stars)
  - **Interactive:** User clicks to rate (1-5 stars)
- **Sizes:** Small, medium, large

### ReviewForm (`components/ReviewForm.tsx`)
- **Purpose:** Submit a review
- **Features:**
  - Star rating selector
  - Comment text area
  - Form validation
  - Submit button
  - Success/error messages

### ReviewsList (`components/ReviewsList.tsx`)
- **Purpose:** Display list of reviews
- **Shows:**
  - Customer name and avatar
  - Rating (stars)
  - Comment
  - Date posted
  - Designer response (if any)
- **States:**
  - Loading skeleton
  - Empty state message

---

## 🔌 Services Explained

### API Service (`services/api.ts`)
- **Purpose:** Base Axios configuration
- **Features:**
  - Base URL setup
  - Request interceptor (adds auth token)
  - Response interceptor (handles errors)
  - Automatic token refresh

### Auth Service (`services/auth.ts`)
- **Functions:**
  - `login(username, password)` - Login user
  - `register(userData)` - Register new user
  - `logout()` - Logout user
  - `getCurrentUser()` - Get current user profile

### Designs Service (`services/designs.ts`)
- **Functions:**
  - `getDesigns(filters)` - Get designs with filters
  - `getDesignById(id)` - Get single design
  - `createDesign(data)` - Upload new design
  - `getCategories()` - Get all categories
  - `getDesignerDesigns(designerId)` - Get designer's designs

### Bookings Service (`services/bookings.ts`)
- **Functions:**
  - `getBookings()` - Get user's bookings
  - `createBooking(data)` - Create new booking
  - `updateBooking(id, data)` - Update booking status
  - `getBookingById(id)` - Get single booking

### Favorites Service (`services/favorites.ts`)
- **Functions:**
  - `getFavorites(page)` - Get user's favorites
  - `addFavorite(designId)` - Add to favorites
  - `removeFavorite(designId)` - Remove from favorites
  - `toggleFavorite(designId)` - Toggle favorite status

### Admin Service (`services/admin.ts`)
- **Functions:**
  - `getDashboard()` - Get dashboard stats
  - `getUsers(filters)` - Get all users
  - `approveUser(id)` - Approve designer
  - `getDesigns(filters)` - Get all designs
  - `approveDesign(id)` - Approve design
  - `rejectDesign(id, reason)` - Reject design

---

## 🎨 Styling with TailwindCSS

### What is TailwindCSS?

TailwindCSS is a utility-first CSS framework. Instead of writing custom CSS, you use pre-made classes:

```jsx
// Traditional CSS
<div className="my-custom-class">

// TailwindCSS
<div className="bg-blue-500 text-white p-4 rounded-lg">
```

### Common Classes Used

| Class | What it Does | Example |
|-------|-------------|---------|
| `bg-pink-600` | Background color | Pink background |
| `text-white` | Text color | White text |
| `p-4` | Padding | Padding on all sides |
| `m-4` | Margin | Margin on all sides |
| `rounded-lg` | Border radius | Rounded corners |
| `shadow-md` | Box shadow | Medium shadow |
| `flex` | Flexbox | Flex container |
| `grid` | Grid | Grid container |
| `hover:bg-pink-700` | Hover state | Darker pink on hover |

### Responsive Design

TailwindCSS makes responsive design easy:

```jsx
<div className="
  grid 
  grid-cols-1        {/* 1 column on mobile */}
  md:grid-cols-2     {/* 2 columns on tablets */}
  lg:grid-cols-4     {/* 4 columns on desktop */}
">
```

Breakpoints:
- `sm:` - Small devices (640px+)
- `md:` - Medium devices (768px+)
- `lg:` - Large devices (1024px+)
- `xl:` - Extra large (1280px+)

---

## 🔐 Authentication Flow

### How Login Works

1. **User enters credentials** on Login page
2. **Frontend sends** username & password to backend
3. **Backend verifies** and returns JWT tokens
4. **Frontend stores** tokens in localStorage
5. **AuthContext updates** user state
6. **User is redirected** to homepage
7. **Future requests** include auth token in headers

### Protected Routes

Some pages require authentication:

```typescript
// Only logged-in users can access
<Route 
  path="/booking" 
  element={<ProtectedRoute><Booking /></ProtectedRoute>} 
/>

// Only admins can access
<Route 
  path="/admin" 
  element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} 
/>
```

### Using Auth in Components

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {user?.first_name}!</div>;
}
```

---

## 🧪 Testing the Frontend

### Manual Testing Checklist

#### **Guest User (Not Logged In):**
- [ ] Can view homepage
- [ ] Can browse gallery
- [ ] Can search and filter designs
- [ ] Can view designer profiles
- [ ] Cannot access booking page
- [ ] Cannot favorite designs
- [ ] Can register and login

#### **Customer User:**
- [ ] Can do everything guests can
- [ ] Can create bookings
- [ ] Can view their bookings
- [ ] Can favorite designs
- [ ] Can view favorites page
- [ ] Can submit reviews
- [ ] Can logout

#### **Designer User:**
- [ ] Can upload designs
- [ ] Can view their designs
- [ ] Can see booking requests
- [ ] Can accept/reject bookings
- [ ] Can respond to reviews
- [ ] Can edit profile

#### **Admin User:**
- [ ] Can access admin panel
- [ ] Can approve/reject designers
- [ ] Can approve/reject designs
- [ ] Can view all bookings
- [ ] Can moderate reviews
- [ ] Can see dashboard stats

---

## 🐛 Common Issues & Solutions

### Issue: "npm install" fails
**Solution:** 
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Use a different port
PORT=3001 npm start
```

### Issue: "API calls failing"
**Solution:**
1. Check if backend is running on `http://localhost:8000`
2. Check `src/services/api.ts` for correct API URL
3. Check browser console for error messages
4. Check Network tab in browser DevTools

### Issue: "Cannot login / Unauthorized"
**Solution:**
1. Check credentials are correct
2. Clear localStorage: `localStorage.clear()`
3. Make sure backend user exists
4. Check token in localStorage

### Issue: "Images not loading"
**Solution:**
1. Check image URL in API response
2. Make sure backend media files are accessible
3. Check CORS settings in backend
4. Check browser console for 404 errors

### Issue: "CSS not applying"
**Solution:**
1. Check if TailwindCSS is configured
2. Restart dev server: `npm start`
3. Check `tailwind.config.js` for correct content paths
4. Clear browser cache

---

## 📝 Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for TypeScript errors
npm run type-check

# Format code (if Prettier installed)
npm run format

# Lint code (if ESLint installed)
npm run lint

# Update dependencies
npm update

# Install specific package
npm install package-name

# Remove package
npm uninstall package-name
```

---

## 🏗️ Building for Production

### Step 1: Build the App

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Step 2: Test Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build
```

Visit `http://localhost:3000` to test the production build.

### Step 3: Deploy

**Popular deployment platforms:**

#### **Vercel (Recommended for beginners)**
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Your site is live!

#### **Netlify**
1. Drag and drop `build/` folder to Netlify
2. Or connect GitHub repo for auto-deploy

#### **GitHub Pages**
1. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/repo-name"
   ```
2. Install: `npm install --save-dev gh-pages`
3. Add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Run: `npm run deploy`

---

## 🎨 Customization Guide

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#ec4899',  // Change this
          600: '#db2777',  // And this
          700: '#be185d',  // And this
        }
      }
    }
  }
}
```

### Add New Page

1. **Create component:**
   ```typescript
   // src/pages/NewPage.tsx
   import React from 'react';
   
   const NewPage: React.FC = () => {
     return <div>New Page Content</div>;
   };
   
   export default NewPage;
   ```

2. **Add route in App.tsx:**
   ```typescript
   import NewPage from './pages/NewPage';
   
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Add navigation link in Navbar.tsx:**
   ```typescript
   <Link to="/new-page">New Page</Link>
   ```

### Add New API Endpoint

1. **Create service function:**
   ```typescript
   // src/services/myservice.ts
   import api from './api';
   
   export const myService = {
     getData: async () => {
       const response = await api.get('/my-endpoint/');
       return response.data;
     }
   };
   ```

2. **Use in component:**
   ```typescript
   import { myService } from '../services/myservice';
   
   const data = await myService.getData();
   ```

---

## 🤝 Contributing

Want to add features or fix bugs?

1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature-name`
3. **Make your changes**
4. **Test thoroughly** (run the app, check all pages)
5. **Commit:** `git commit -m "Add feature description"`
6. **Push:** `git push origin feature-name`
7. **Create a Pull Request**

---

## 📚 Learning Resources

- **React Documentation:** https://react.dev/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **TailwindCSS Docs:** https://tailwindcss.com/docs
- **React Router:** https://reactrouter.com/
- **Axios:** https://axios-http.com/docs/intro

---

## 📧 Need Help?

Stuck on something? Here's what to do:

1. **Check browser console** (F12) for error messages
2. **Check Network tab** to see API responses
3. **Google the error message** - someone else has probably faced it
4. **Check Stack Overflow**
5. **Read the documentation** for the technology you're using
6. **Ask for help** - no question is too basic!

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**

Remember: Every expert was once a beginner. Take it step by step, and don't hesitate to experiment and make mistakes - that's how you learn!
