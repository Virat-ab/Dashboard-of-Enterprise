import type { LoginCredentials, LoginResponse } from '@types/api.types';
import { axiosInstance } from '@services/api/axiosConfig';

// Mock data for demo
const MOCK_USER = {
  id: '1',
  email: 'admin@enterprise.com',
  name: 'Alex Johnson',
  role: 'admin' as const,
  avatar: 'https://i.pravatar.cc/150?img=1',
  preferences: { theme: 'dark' as const, language: 'en', notifications: true, dashboardLayout: 'default' },
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
};

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
      await new Promise((r) => setTimeout(r, 800));
      if (credentials.email === 'admin@enterprise.com' && credentials.password === 'password') {
        return {
          user: MOCK_USER,
          tokens: {
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token',
            expiresIn: 3600,
          },
        };
      }
      throw new Error('Invalid credentials');
    }
    const { data } = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    return data;
  },

  logout: async (): Promise<void> => {
    if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
      await new Promise((r) => setTimeout(r, 200));
      return;
    }
    await axiosInstance.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
      return { accessToken: 'mock-access-token-refreshed-' + Date.now() };
    }
    const { data } = await axiosInstance.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
    return data;
  },

  getProfile: async () => {
    if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
      return MOCK_USER;
    }
    const { data } = await axiosInstance.get('/auth/profile');
    return data;
  },
};
