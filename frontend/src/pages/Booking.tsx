import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { bookingService } from '../services/bookings';
import { User, BookingCreateData } from '../types';
import api from '../services/api';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [designers, setDesigners] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDesigners, setLoadingDesigners] = useState(true);
  const [selectedDesigner, setSelectedDesigner] = useState<User | null>(null);

  const [formData, setFormData] = useState<BookingCreateData>({
    designer: 0,
    booking_date: '',
    booking_time: '',
    duration_hours: 2,
    event_type: '',
    location: '',
    notes: '',
    estimated_price: undefined,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    loadDesigners();
  }, []);

  // Pre-select designer from URL params
  useEffect(() => {
    const designerId = searchParams.get('designer');
    if (designerId && designers.length > 0) {
      handleDesignerSelect(parseInt(designerId));
    }
  }, [searchParams, designers]);

  const loadDesigners = async () => {
    try {
      setLoadingDesigners(true);
      const response = await api.get('/users/designers/', {
        params: { is_approved: true, page_size: 100, ordering: '-average_rating' }
      });
      setDesigners(response.data.results);
    } catch (error) {
      console.error('Error loading designers:', error);
      toast.error('Failed to load designers');
    } finally {
      setLoadingDesigners(false);
    }
  };

  const handleDesignerSelect = (designerId: number) => {
    const designer = designers.find(d => d.id === designerId);
    setSelectedDesigner(designer || null);
    setFormData({ ...formData, designer: designerId });
    setErrors({ ...errors, designer: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'duration_hours' || name === 'estimated_price' ? Number(value) : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.designer) {
      newErrors.designer = 'Please select a designer';
    }
    if (!formData.booking_date) {
      newErrors.booking_date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.booking_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.booking_date = 'Booking date must be today or in the future';
      }
    }
    if (!formData.booking_time) {
      newErrors.booking_time = 'Please select a time';
    }
    if (!formData.event_type) {
      newErrors.event_type = 'Please specify the event type';
    }
    if (!formData.location) {
      newErrors.location = 'Please provide the location';
    }
    if (formData.duration_hours < 1 || formData.duration_hours > 12) {
      newErrors.duration_hours = 'Duration must be between 1 and 12 hours';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await bookingService.createBooking(formData);
      toast.success('Booking request submitted successfully! The designer will confirm shortly.');
      navigate('/');
    } catch (err: any) {
      if (err.response?.data) {
        setErrors(err.response.data);
        toast.error('Failed to create booking. Please check the form and try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const eventTypes = [
    'Wedding',
    'Engagement',
    'Birthday Party',
    'Festival',
    'Bridal Shower',
    'Baby Shower',
    'Corporate Event',
    'Other'
  ];

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Mehndi Artist</h1>
          <p className="text-lg text-gray-600">
            Find the perfect artist for your special occasion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Designer Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Designer</h2>

              {loadingDesigners ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-300 h-20 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {designers.map((designer) => (
                    <div
                      key={designer.id}
                      onClick={() => handleDesignerSelect(designer.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition duration-200 ${
                        formData.designer === designer.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {designer.profile_picture ? (
                            <img
                              src={designer.profile_picture}
                              alt={`${designer.first_name} ${designer.last_name}`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {designer.first_name?.[0]}{designer.last_name?.[0]}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {designer.first_name} {designer.last_name}
                          </p>
                          {designer.specialization && (
                            <p className="text-sm text-gray-600 truncate">{designer.specialization}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span className="ml-1 text-sm font-semibold text-gray-900">
                                {designer.average_rating.toFixed(1)}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              • {designer.total_bookings} bookings
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.designer && (
                <p className="mt-2 text-sm text-red-600">{errors.designer}</p>
              )}

              {/* Selected Designer Info */}
              {selectedDesigner && (
                <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Selected Designer</h3>
                  <p className="text-sm text-gray-700">
                    {selectedDesigner.first_name} {selectedDesigner.last_name}
                  </p>
                  {selectedDesigner.years_of_experience && (
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedDesigner.years_of_experience} years of experience
                    </p>
                  )}
                  {selectedDesigner.phone && (
                    <p className="text-sm text-gray-600 mt-1">
                      📞 {selectedDesigner.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div>
                    <label htmlFor="booking_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Date *
                    </label>
                    <input
                      type="date"
                      id="booking_date"
                      name="booking_date"
                      min={minDate}
                      value={formData.booking_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    {errors.booking_date && (
                      <p className="mt-1 text-sm text-red-600">{errors.booking_date}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="booking_time" className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Time *
                    </label>
                    <input
                      type="time"
                      id="booking_time"
                      name="booking_time"
                      value={formData.booking_time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    {errors.booking_time && (
                      <p className="mt-1 text-sm text-red-600">{errors.booking_time}</p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <label htmlFor="duration_hours" className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Hours) *
                    </label>
                    <input
                      type="number"
                      id="duration_hours"
                      name="duration_hours"
                      min="1"
                      max="12"
                      value={formData.duration_hours}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    {errors.duration_hours && (
                      <p className="mt-1 text-sm text-red-600">{errors.duration_hours}</p>
                    )}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      id="event_type"
                      name="event_type"
                      value={formData.event_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.event_type && (
                      <p className="mt-1 text-sm text-red-600">{errors.event_type}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter full address"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                {/* Estimated Price */}
                <div>
                  <label htmlFor="estimated_price" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Price (Optional)
                  </label>
                  <input
                    type="number"
                    id="estimated_price"
                    name="estimated_price"
                    min="0"
                    placeholder="Enter estimated price"
                    value={formData.estimated_price || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This will be discussed and confirmed with the designer
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Any special requirements or preferences..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !formData.designer}
                    className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                  >
                    {loading ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                  <p className="mt-3 text-sm text-gray-600 text-center">
                    The designer will review and confirm your booking
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;