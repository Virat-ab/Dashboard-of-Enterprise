import React, { useState, memo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '@components/organisms/Header';
import { Sidebar } from '@components/organisms/Sidebar';
import { NotificationPanel } from '@features/notifications/components/NotificationPanel';

export const DashboardLayout = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header onMenuClick={() => setSidebarOpen((p) => !p)} sidebarOpen={sidebarOpen} />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px',
          ml: isMobile ? 0 : sidebarOpen ? '240px' : '72px',
          transition: 'margin-left 0.2s ease',
          minHeight: 'calc(100vh - 64px)',
          p: { xs: 2, md: 3 },
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(34,197,94,0.03) 0%, transparent 50%)
          `,
        }}
      >
        <Outlet />
      </Box>

      <NotificationPanel />
    </Box>
  );
});

DashboardLayout.displayName = 'DashboardLayout';
