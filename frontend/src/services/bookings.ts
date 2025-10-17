import api from './api';
import { Booking, BookingCreateData, PaginatedResponse, Notification } from '../types';

export const bookingService = {
  async getBookings(params?: {
    status?: string;
    designer?: number;
    customer?: number;
    ordering?: string;
    page?: number;
  }): Promise<PaginatedResponse<Booking>> {
    const response = await api.get<PaginatedResponse<Booking>>('/bookings/', {
      params,
    });
    return response.data;
  },

  async getBookingById(id: number): Promise<Booking> {
    const response = await api.get<Booking>(`/bookings/${id}/`);
    return response.data;
  },

  async createBooking(data: BookingCreateData): Promise<Booking> {
    const response = await api.post<Booking>('/bookings/', data);
    return response.data;
  },

  async updateBookingStatus(id: number, status: string): Promise<Booking> {
    const response = await api.patch<Booking>(`/bookings/${id}/update_status/`, {
      status,
    });
    return response.data;
  },

  async cancelBooking(id: number, reason: string): Promise<Booking> {
    const response = await api.post<Booking>(`/bookings/${id}/cancel/`, {
      cancellation_reason: reason,
    });
    return response.data;
  },

  async getNotifications(): Promise<Notification[]> {
    const response = await api.get<Notification[]>('/bookings/notifications/');
    return response.data;
  },

  async markNotificationAsRead(id: number): Promise<Notification> {
    const response = await api.patch<Notification>(`/bookings/notifications/${id}/mark_as_read/`);
    return response.data;
  },
};
