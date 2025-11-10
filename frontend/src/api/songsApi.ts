import axiosInstance from './axios';
import type { Song, SongInput, SongsResponse, Filters } from '../types/Song';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const songsApi = {
  getSongs: async (filters: Filters & { page?: number; limit?: number }): Promise<SongsResponse> => {
    const params = new URLSearchParams();
    
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.artist) params.append('artist', filters.artist);
    if (filters.album) params.append('album', filters.album);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response: ApiResponse<SongsResponse> = await axiosInstance.get(`/songs?${params.toString()}`);
    return response.data;
  },

  getSongById: async (id: string): Promise<Song> => {
    const response: ApiResponse<Song> = await axiosInstance.get(`/songs/${id}`);
    return response.data;
  },

  createSong: async (song: SongInput): Promise<Song> => {
    const response: ApiResponse<Song> = await axiosInstance.post('/songs', song);
    return response.data;
  },

  updateSong: async (id: string, song: Partial<SongInput>): Promise<Song> => {
    const response: ApiResponse<Song> = await axiosInstance.put(`/songs/${id}`, song);
    return response.data;
  },

  deleteSong: async (id: string): Promise<Song> => {
    const response: ApiResponse<Song> = await axiosInstance.delete(`/songs/${id}`);
    return response.data;
  },
};
