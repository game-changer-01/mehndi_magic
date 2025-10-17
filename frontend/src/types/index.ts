// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'customer' | 'designer' | 'admin';
  phone?: string;
  profile_picture?: string;
  bio?: string;
  location?: string;
  is_approved: boolean;
  years_of_experience?: number;
  specialization?: string;
  portfolio_url?: string;
  total_bookings: number;
  average_rating: number;
  created_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  role: 'customer' | 'designer';
  phone?: string;
}

// Design Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  designs_count: number;
  created_at: string;
}

export interface Design {
  id: number;
  title: string;
  description?: string;
  image: string;
  category: number;
  category_name?: string;
  designer: number;
  designer_name?: string;
  designer_profile_picture?: string;
  designer_rating?: number;
  status: 'pending' | 'approved' | 'rejected';
  views_count: number;
  likes_count: number;
  dislikes_count: number;
  net_likes?: number;
  tags?: string;
  tags_list?: string[];
  price_range?: string;
  is_liked?: boolean;
  is_favorited?: boolean;
  created_at: string;
  updated_at: string;
}

export interface DesignCreateData {
  title: string;
  description?: string;
  image: File;
  category: number;
  tags?: string;
  price_range?: string;
}

// Booking Types
export interface Booking {
  id: number;
  customer: number;
  customer_name?: string;
  customer_phone?: string;
  designer: number;
  designer_name?: string;
  designer_phone?: string;
  booking_date: string;
  booking_time: string;
  duration_hours: number;
  event_type: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  estimated_price?: number;
  created_at: string;
  updated_at: string;
  cancelled_by?: number;
  cancellation_reason?: string;
}

export interface BookingCreateData {
  designer: number;
  booking_date: string;
  booking_time: string;
  duration_hours: number;
  event_type: string;
  location: string;
  notes?: string;
  estimated_price?: number;
}

// Review Types
export interface Review {
  id: number;
  customer: number;
  customer_name?: string;
  customer_profile_picture?: string;
  designer: number;
  designer_name?: string;
  rating: number;
  comment: string;
  designer_response?: string;
  response_date?: string;
  is_reported: boolean;
  is_flagged?: boolean;
  report_reason?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewCreateData {
  designer: number;
  rating: number;
  comment: string;
}

// Notification Types
export interface Notification {
  id: number;
  user: number;
  notification_type: string;
  title: string;
  message: string;
  booking?: number;
  is_read: boolean;
  is_emailed: boolean;
  created_at: string;
}

// Favorite Types
export interface Favorite {
  id: number;
  design: number;
  design_details?: Design;
  created_at: string;
}

// Dashboard Stats
export interface DashboardStats {
  total_bookings: number;
  pending_bookings?: number;
  completed_bookings?: number;
  total_designs?: number;
  average_rating?: number;
  favorites_count?: number;
}

// Admin Dashboard
export interface AdminDashboard {
  total_users: number;
  total_designs: number;
  total_bookings: number;
  total_reviews: number;
  pending_designer_approvals: number;
  pending_design_approvals: number;
  active_designers: number;
  flagged_reviews: number;
  users?: {
    total: number;
    designers: number;
    customers: number;
    pending_designers: number;
  };
  designs?: {
    total: number;
    pending: number;
    approved: number;
  };
  bookings?: {
    total: number;
    pending: number;
    completed: number;
  };
  moderation?: {
    reported_reviews: number;
  };
  top_designers?: User[];
  popular_designs?: Design[];
}

// API Response Types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  [key: string]: any;
}
