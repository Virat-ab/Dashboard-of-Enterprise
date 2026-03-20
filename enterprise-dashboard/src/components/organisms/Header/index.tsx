import React, { memo } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Avatar,
  Badge, Tooltip, Chip, useTheme
} from '@mui/material';
import {
  NotificationsOutlined, MenuOutlined, WifiTethering,
  WifiTetheringOff, Brightness4, Brightness7
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { togglePanel, selectUnreadCount } from '@features/notifications/slices/notificationsSlice';
import { selectCurrentUser } from '@features/auth/slices/authSlice';
import { selectIsRealTimeEnabled, toggleRealTime } from '@features/dashboard/slices/dashboardSlice';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export const Header = memo<HeaderProps>(({ onMenuClick }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectCurrentUser);
  const unreadCount = useAppSelector(selectUnreadCount);
  const isRealTime = useAppSelector(selectIsRealTimeEnabled);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: 'rgba(10,15,30,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.12)',
        width: '100%',
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: 64 }}>
        <IconButton edge="start" onClick={onMenuClick} sx={{ color: 'text.secondary' }}>
          <MenuOutlined />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto' }}>
          <Box
            sx={{
              width: 28, height: 28, borderRadius: 1,
              background: 'linear-gradient(135deg, #6366f1, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>ED</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', display: { xs: 'none', sm: 'block' } }}>
            Enterprise Dashboard
          </Typography>
        </Box>

        {/* Real-time toggle */}
        <Tooltip title={isRealTime ? 'Disable real-time' : 'Enable real-time'}>
          <Chip
            icon={isRealTime ? <WifiTethering sx={{ fontSize: 14 }} /> : <WifiTetheringOff sx={{ fontSize: 14 }} />}
            label={isRealTime ? 'Live' : 'Paused'}
            size="small"
            onClick={() => dispatch(toggleRealTime())}
            sx={{
              cursor: 'pointer',
              bgcolor: isRealTime ? 'rgba(34,197,94,0.12)' : 'rgba(148,163,184,0.1)',
              color: isRealTime ? 'success.main' : 'text.secondary',
              border: '1px solid',
              borderColor: isRealTime ? 'rgba(34,197,94,0.3)' : 'rgba(148,163,184,0.2)',
              '& .MuiChip-icon': { color: 'inherit' },
              display: { xs: 'none', sm: 'flex' },
              animation: isRealTime ? 'pulse 2s infinite' : 'none',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.6 },
              },
            }}
          />
        </Tooltip>

        {/* Notifications */}
        <Tooltip title={t('notifications.title')}>
          <IconButton onClick={() => dispatch(togglePanel())} sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={unreadCount} color="error" max={99}>
              <NotificationsOutlined />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User avatar */}
        <Tooltip title={user?.name ?? 'User'}>
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{
              width: 34, height: 34, cursor: 'pointer',
              border: '2px solid rgba(99,102,241,0.4)',
              fontSize: '0.875rem',
              background: 'linear-gradient(135deg, #6366f1, #22c55e)',
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';
