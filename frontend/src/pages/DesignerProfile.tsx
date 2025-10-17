import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { designService } from '../services/designs';
import { User, Design, Review } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const DesignerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [designer, setDesigner] = useState<User | null>(null);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews'>('portfolio');

  useEffect(() => {
    loadDesignerData();
  }, [id]);

  const loadDesignerData = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      // Load designer info
      const designerResponse = await api.get<User>(`/users/${id}/`);
      setDesigner(designerResponse.data);

      // Load designer's designs
      const designsResponse = await designService.getDesigns({
        designer: parseInt(id),
        status: 'approved',
      });
      setDesigns(designsResponse.results);

      // Load reviews
      const reviewsData = await designService.getReviews(parseInt(id));
      setReviews(reviewsData);
    } catch (error) {
      toast.error('Failed to load designer profile');
      console.error('Error loading designer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    navigate(`/booking?designer=${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!designer) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Designer Not Found</h2>
          <p className="text-gray-600 mb-4">The designer you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/gallery')}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Browse Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {designer.profile_picture ? (
                <img
                  src={designer.profile_picture}
                  alt={`${designer.first_name} ${designer.last_name}`}
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                  <span className="text-4xl font-bold text-pink-600">
                    {designer.first_name?.[0]}{designer.last_name?.[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left text-white">
              <h1 className="text-4xl font-bold mb-2">
                {designer.first_name} {designer.last_name}
              </h1>
              {designer.specialization && (
                <p className="text-xl mb-4 text-pink-100">{designer.specialization}</p>
              )}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{designer.average_rating.toFixed(1)}</span>
                  <span className="ml-1">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{designer.total_bookings} bookings completed</span>
                </div>
                {designer.years_of_experience && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{designer.years_of_experience} years experience</span>
                  </div>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleBookNow}
                className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-pink-50 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* About Section */}
        {designer.bio && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 whitespace-pre-line">{designer.bio}</p>
            {designer.location && (
              <div className="mt-4 flex items-center text-gray-600">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{designer.location}</span>
              </div>
            )}
            {designer.portfolio_url && (
              <div className="mt-2">
                <a
                  href={designer.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  View External Portfolio →
                </a>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'portfolio'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Portfolio ({designs.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                {designs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designs.map((design) => (
                      <div key={design.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition duration-300">
                        <div className="relative h-64">
                          <img
                            src={design.image}
                            alt={design.title}
                            className="w-full h-full object-cover"
                          />
                          {design.category_name && (
                            <span className="absolute top-2 right-2 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {design.category_name}
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{design.title}</h3>
                          {design.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{design.description}</p>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                                {design.likes_count}
                              </span>
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {design.views_count}
                              </span>
                            </div>
                            {design.price_range && (
                              <span className="font-semibold text-pink-600">{design.price_range}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No designs uploaded yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {review.customer_profile_picture ? (
                              <img
                                src={review.customer_profile_picture}
                                alt={review.customer_name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <span className="text-pink-600 font-semibold">
                                  {review.customer_name?.[0] || 'U'}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900">{review.customer_name || 'Anonymous'}</h4>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            {review.designer_response && (
                              <div className="mt-3 bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-semibold text-gray-900 mb-1">Designer Response:</p>
                                <p className="text-sm text-gray-700">{review.designer_response}</p>
                                {review.response_date && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(review.response_date).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No reviews yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-white text-lg mb-6">
            Schedule your appointment with {designer.first_name} today!
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-pink-50 transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignerProfile;
