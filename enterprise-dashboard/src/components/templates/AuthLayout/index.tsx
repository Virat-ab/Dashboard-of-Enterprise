import React from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      background: `
        radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 70%, rgba(34,197,94,0.05) 0%, transparent 60%),
        #0a0f1e
      `,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Grid overlay */}
    <Box
      sx={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
    <Outlet />
  </Box>
);
