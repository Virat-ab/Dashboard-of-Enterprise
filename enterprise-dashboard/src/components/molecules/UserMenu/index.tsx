import React, { memo, useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography, Divider, ListItemIcon } from '@mui/material';
import { PersonOutlined, SettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';

export const UserMenu = memo(() => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <Box onClick={(e) => setAnchor(e.currentTarget)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={user?.avatar} sx={{ width: 34, height: 34, fontSize: '0.875rem', background: 'linear-gradient(135deg, #6366f1, #22c55e)' }}>
          {user?.name?.charAt(0)}
        </Avatar>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: '0.8rem' }}>
            {user?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            {user?.role}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1, minWidth: 180,
            background: 'rgba(15,22,41,0.97)',
            border: '1px solid rgba(99,102,241,0.15)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <MenuItem onClick={() => { navigate('/settings'); setAnchor(null); }}>
          <ListItemIcon><PersonOutlined fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { navigate('/settings'); setAnchor(null); }}>
          <ListItemIcon><SettingsOutlined fontSize="small" /></ListItemIcon>
          Settings
        </MenuItem>
        <Divider sx={{ borderColor: 'divider' }} />
        <MenuItem onClick={() => { logout(); setAnchor(null); }} sx={{ color: 'error.main' }}>
          <ListItemIcon><LogoutOutlined fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
});

UserMenu.displayName = 'UserMenu';
