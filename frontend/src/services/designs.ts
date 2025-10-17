import api from './api';
import { Design, DesignCreateData, PaginatedResponse, Category, Review, ReviewCreateData } from '../types';

export const designService = {
  async getDesigns(params?: {
    search?: string;
    category?: number;
    designer?: number;
    status?: string;
    ordering?: string;
    page?: number;
    page_size?: number;
  }): Promise<PaginatedResponse<Design>> {
    const response = await api.get<PaginatedResponse<Design>>('/gallery/designs/', {
      params,
    });
    return response.data;
  },

  async getDesignById(id: number): Promise<Design> {
    const response = await api.get<Design>(`/gallery/designs/${id}/`);
    return response.data;
  },

  async createDesign(data: DesignCreateData): Promise<Design> {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }
    formData.append('category', data.category.toString());
    if (data.price_range) {
      formData.append('price_range', data.price_range);
    }
    if (data.tags) {
      formData.append('tags', data.tags);
    }
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post<Design>('/gallery/designs/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateDesign(id: number, data: Partial<DesignCreateData>): Promise<Design> {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.category) formData.append('category', data.category.toString());
    if (data.price_range) formData.append('price_range', data.price_range);
    if (data.tags) formData.append('tags', data.tags);
    if (data.image) formData.append('image', data.image);

    const response = await api.patch<Design>(`/gallery/designs/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteDesign(id: number): Promise<void> {
    await api.delete(`/gallery/designs/${id}/`);
  },

  async likeDesign(id: number, reactionType: 'like' | 'dislike'): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/gallery/designs/${id}/like/`, {
      reaction_type: reactionType,
    });
    return response.data;
  },

  async favoriteDesign(id: number): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`/gallery/designs/${id}/favorite/`);
    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/gallery/categories/');
    return response.data;
  },

  async getReviews(designerId: number): Promise<Review[]> {
    const response = await api.get<Review[]>(`/gallery/reviews/?designer=${designerId}`);
    return response.data;
  },

  async createReview(data: ReviewCreateData): Promise<Review> {
    const response = await api.post<Review>('/gallery/reviews/', data);
    return response.data;
  },
};
