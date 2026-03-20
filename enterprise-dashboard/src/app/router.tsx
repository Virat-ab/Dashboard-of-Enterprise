import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { DashboardLayout } from '@components/templates/DashboardLayout';
import { AuthLayout } from '@components/templates/AuthLayout';
import { RequireAuth, GuestOnly } from '@features/auth/components/RouteGuard';
import { useWebSocketConnection } from '@hooks/useWebSocket';

// Lazy-loaded pages
const LoginPage = lazy(() => import('@features/auth/components/LoginPage'));
const DashboardPage = lazy(() => import('@pages/Dashboard'));
const AnalyticsPage = lazy(() => import('@pages/Analytics'));
const SettingsPage = lazy(() => import('@pages/Settings'));

const PageLoader = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <CircularProgress size={36} thickness={4} />
  </Box>
);

export const AppRouter: React.FC = () => {
  // Connect WebSocket once at the app level
  useWebSocketConnection();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <GuestOnly>
                <LoginPage />
              </GuestOnly>
            }
          />
        </Route>

        {/* Protected app routes */}
        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/reports" element={<AnalyticsPage />} />
          <Route path="/users" element={<SettingsPage />} />
        </Route>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};
