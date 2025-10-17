import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Mehndi Art
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Home
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Gallery
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-pink-600 font-medium transition">
              Booking
            </Link>
            
            {user ? (
              <>
                <Link to="/favorites" className="text-gray-700 hover:text-pink-600 font-medium transition flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Favorites
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-pink-600 font-medium transition">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Hi, {user.first_name || user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-pink-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-pink-600">
              Home
            </Link>
            <Link to="/gallery" className="block py-2 text-gray-700 hover:text-pink-600">
              Gallery
            </Link>
            <Link to="/booking" className="block py-2 text-gray-700 hover:text-pink-600">
              Booking
            </Link>
            {user ? (
              <>
                <Link to="/favorites" className="block py-2 text-gray-700 hover:text-pink-600">
                  Favorites
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block py-2 text-gray-700 hover:text-pink-600">
                    Admin Panel
                  </Link>
                )}
                <div className="pt-2 border-t border-gray-200">
                  <p className="py-2 text-sm text-gray-600">Hi, {user.first_name || user.username}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-gray-700 hover:text-pink-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-pink-600">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-gray-700 hover:text-pink-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;