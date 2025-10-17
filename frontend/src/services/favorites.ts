import api from './api';
import { Favorite, PaginatedResponse } from '../types';

export const favoriteService = {
  async getFavorites(params?: {
    page?: number;
    page_size?: number;
  }): Promise<PaginatedResponse<Favorite>> {
    const response = await api.get<PaginatedResponse<Favorite>>('/gallery/favorites/', {
      params,
    });
    return response.data;
  },

  async addFavorite(designId: number): Promise<Favorite> {
    const response = await api.post<Favorite>('/gallery/favorites/', {
      design: designId,
    });
    return response.data;
  },

  async removeFavorite(favoriteId: number): Promise<void> {
    await api.delete(`/gallery/favorites/${favoriteId}/`);
  },

  async toggleFavorite(designId: number): Promise<{ message: string; is_favorited: boolean }> {
    // This will use the favorite endpoint on designs
    const response = await api.post<{ message: string; is_favorited: boolean }>(
      `/gallery/designs/${designId}/favorite/`
    );
    return response.data;
  },
};
