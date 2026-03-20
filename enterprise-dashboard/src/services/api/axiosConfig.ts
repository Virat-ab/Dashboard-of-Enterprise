import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { store } from '@app/store';
import { selectAccessToken, clearAuth } from '@features/auth/slices/authSlice';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.enterprise-demo.com/v1',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = selectAccessToken(store.getState() as Parameters<typeof selectAccessToken>[0]);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
