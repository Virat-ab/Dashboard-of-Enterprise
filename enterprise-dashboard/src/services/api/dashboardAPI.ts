import type { DashboardStats } from '@types/api.types';
import { axiosInstance } from './axiosConfig';
import { generateMockStats } from '@utils/mockDataGenerator';

export const dashboardAPI = {
  getStats: async (timeRange: string): Promise<DashboardStats> => {
    if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
      await new Promise((r) => setTimeout(r, 600));
      return generateMockStats(timeRange);
    }
    const { data } = await axiosInstance.get<DashboardStats>(`/dashboard/stats?range=${timeRange}`);
    return data;
  },

  exportData: async (format: 'csv' | 'pdf' | 'png', filters?: Record<string, unknown>) => {
    const { data } = await axiosInstance.get('/dashboard/export', {
      params: { format, ...filters },
      responseType: 'blob',
    });
    return data as Blob;
  },
};
