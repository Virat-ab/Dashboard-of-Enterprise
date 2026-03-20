import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';
import { selectIsAuthenticated } from '@features/auth/slices/authSlice';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

interface GuestOnlyProps {
  children: React.ReactNode;
}

export const GuestOnly: React.FC<GuestOnlyProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};
