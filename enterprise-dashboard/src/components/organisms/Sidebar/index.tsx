import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, Box, Avatar, Divider, Tooltip, Chip
} from '@mui/material';
import {
  DashboardOutlined, BarChartOutlined, PeopleOutlined,
  SettingsOutlined, AssessmentOutlined, LogoutOutlined
} from '@mui/icons-material';
import { useAppSelector } from '@app/hooks';
import { selectCurrentUser } from '@features/auth/slices/authSlice';
import { useAuth } from '@features/auth/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlined /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChartOutlined /> },
  { label: 'Reports', path: '/reports', icon: <AssessmentOutlined /> },
  { label: 'Users', path: '/users', icon: <PeopleOutlined />, badge: 'New' },
  { label: 'Settings', path: '/settings', icon: <SettingsOutlined /> },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

export const Sidebar = memo<SidebarProps>(({ open, onClose, variant = 'permanent' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleNav = (path: string) => {
    navigate(path);
    if (variant === 'temporary') onClose();
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 1 }}>
      {/* Logo */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 1.5,
            background: 'linear-gradient(135deg, #6366f1 0%, #22c55e 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>E</Typography>
        </Box>
        {open && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: '0.9rem' }}>
              Enterprise
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              Analytics Suite
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: 'divider', my: 1 }} />

      {/* Nav */}
      <List sx={{ px: 1, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={!open ? item.label : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNav(item.path)}
                  sx={{
                    borderRadius: 2,
                    minHeight: 44,
                    px: open ? 1.5 : 1.5,
                    justifyContent: open ? 'initial' : 'center',
                    bgcolor: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: active ? 'primary.main' : 'text.secondary',
                    border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: active ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.06)',
                      color: active ? 'primary.main' : 'text.primary',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 36 : 'auto',
                      color: 'inherit',
                      '& svg': { fontSize: 20 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400 }}
                      />
                      {item.badge && (
                        <Chip label={item.badge} size="small" color="primary" sx={{ height: 18, fontSize: 10 }} />
                      )}
                    </>
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'divider' }} />

      {/* User profile */}
      <Box sx={{ p: 1.5 }}>
        {open ? (
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.5, p: 1, borderRadius: 2,
              bgcolor: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.1)',
            }}
          >
            <Avatar src={user?.avatar} sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>
              {user?.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }} noWrap>
                {user?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }} noWrap>
                {user?.role}
              </Typography>
            </Box>
            <Tooltip title={t('auth.logout')}>
              <ListItemIcon
                onClick={() => logout()}
                sx={{ minWidth: 'auto', cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'error.main' } }}
              >
                <LogoutOutlined sx={{ fontSize: 18 }} />
              </ListItemIcon>
            </Tooltip>
          </Box>
        ) : (
          <Tooltip title={t('auth.logout')} placement="right">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={user?.avatar} sx={{ width: 32, height: 32, cursor: 'pointer', fontSize: '0.8rem' }}>
                {user?.name?.charAt(0)}
              </Avatar>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          background: 'rgba(10,15,30,0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(99,102,241,0.1)',
          overflowX: 'hidden',
          transition: 'width 0.2s ease',
          top: 0,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
});

Sidebar.displayName = 'Sidebar';
