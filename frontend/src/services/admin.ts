import api from './api';
import { User, Design, Booking, Review, AdminDashboard } from '../types';

export const adminService = {
  async getDashboard(): Promise<AdminDashboard> {
    const response = await api.get<AdminDashboard>('/admin-panel/dashboard/');
    return response.data;
  },

  async getUsers(params?: {
    role?: string;
    is_approved?: boolean;
    search?: string;
    page?: number;
  }): Promise<{ results: User[] }> {
    const response = await api.get<{ results: User[] }>('/admin-panel/users/', {
      params,
    });
    return response.data;
  },

  async approveUser(userId: number): Promise<User> {
    const response = await api.post<User>(`/admin-panel/users/${userId}/approve/`);
    return response.data;
  },

  async deleteUser(userId: number): Promise<void> {
    await api.delete(`/admin-panel/users/${userId}/`);
  },

  async getDesigns(params?: {
    status?: string;
    search?: string;
    page?: number;
  }): Promise<{ results: Design[] }> {
    const response = await api.get<{ results: Design[] }>('/admin-panel/designs/', {
      params,
    });
    return response.data;
  },

  async approveDesign(designId: number): Promise<Design> {
    const response = await api.post<Design>(`/admin-panel/designs/${designId}/approve/`);
    return response.data;
  },

  async rejectDesign(designId: number, reason: string): Promise<Design> {
    const response = await api.post<Design>(`/admin-panel/designs/${designId}/reject/`, {
      rejection_reason: reason,
    });
    return response.data;
  },

  async getBookings(params?: {
    status?: string;
    search?: string;
    page?: number;
  }): Promise<{ results: Booking[] }> {
    const response = await api.get<{ results: Booking[] }>('/admin-panel/bookings/', {
      params,
    });
    return response.data;
  },

  async getReviews(params?: {
    is_flagged?: boolean;
    search?: string;
    page?: number;
  }): Promise<{ results: Review[] }> {
    const response = await api.get<{ results: Review[] }>('/admin-panel/reviews/', {
      params,
    });
    return response.data;
  },

  async flagReview(reviewId: number): Promise<Review> {
    const response = await api.post<Review>(`/admin-panel/reviews/${reviewId}/flag/`);
    return response.data;
  },

  async deleteReview(reviewId: number): Promise<void> {
    await api.delete(`/admin-panel/reviews/${reviewId}/`);
  },
};
