import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  login,
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../slices/authSlice';
import type { LoginCredentials } from '@types/api.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(login(credentials));
      if (login.fulfilled.match(result)) {
        navigate('/dashboard');
      }
      return result;
    },
    [dispatch, navigate]
  );

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};
