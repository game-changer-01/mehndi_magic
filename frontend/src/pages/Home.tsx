import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { designService } from '../services/designs';
import { Design, User } from '../types';
import DesignCard from '../components/DesignCard';
import api from '../services/api';

const Home: React.FC = () => {
  const [popularDesigns, setPopularDesigns] = useState<Design[]>([]);
  const [topDesigners, setTopDesigners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      // Load popular designs
      const designsResponse = await designService.getDesigns({ ordering: '-likes_count', page_size: 6 });
      setPopularDesigns(designsResponse.results);

      // Load top designers
      const designersResponse = await api.get('/users/designers/', {
        params: { ordering: '-average_rating', page_size: 4, is_approved: true }
      });
      setTopDesigners(designersResponse.data.results);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
            Discover Exquisite Mehndi Designs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-3xl mx-auto">
            Connect with talented mehndi artists, explore stunning designs, and book your perfect artist for your special day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Browse Gallery
            </Link>
            <Link
              to="/register"
              className="bg-pink-800 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-900 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Join as Designer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with the best mehndi artists and make booking seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stunning Designs</h3>
              <p className="text-gray-600">
                Browse through thousands of beautiful mehndi designs from talented artists
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Artists</h3>
              <p className="text-gray-600">
                All our designers are verified and reviewed by real customers
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your favorite artist in just a few clicks with instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Designs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Designs</h2>
              <p className="text-gray-600">Trending mehndi designs loved by our community</p>
            </div>
            <Link
              to="/gallery"
              className="text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDesigns.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Designers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Rated Designers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our most talented and highly-rated mehndi artists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDesigners.map((designer) => (
              <div
                key={designer.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-pink-400 to-purple-500">
                  {designer.profile_picture ? (
                    <img
                      src={designer.profile_picture}
                      alt={`${designer.first_name} ${designer.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">
                        {designer.first_name?.[0]}{designer.last_name?.[0]}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {designer.first_name} {designer.last_name}
                  </h3>
                  {designer.specialization && (
                    <p className="text-sm text-gray-600 mb-2">{designer.specialization}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="ml-1 text-sm font-semibold text-gray-900">
                        {designer.average_rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {designer.total_bookings} bookings
                    </span>
                  </div>
                  {designer.years_of_experience && (
                    <p className="text-xs text-gray-500 mt-2">
                      {designer.years_of_experience} years experience
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Mehndi Artist?
          </h2>
          <p className="text-xl mb-8 text-pink-100 max-w-2xl mx-auto">
            Join thousands of happy customers who found their ideal mehndi designer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transition duration-300 shadow-lg"
            >
              Explore Designs
            </Link>
            <Link
              to="/booking"
              className="bg-pink-800 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-900 transition duration-300 shadow-lg border-2 border-white"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600">Designs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">100+</div>
              <div className="text-gray-600">Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;