import axiosInstance from './axios';
import type { Statistics } from '../types/Stats';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const statsApi = {
  getStats: async (): Promise<Statistics> => {
    const response: ApiResponse<Statistics> = await axiosInstance.get('/stats');
    return response.data;
  },
};
