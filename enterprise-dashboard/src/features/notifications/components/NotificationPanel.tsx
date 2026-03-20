import React, { memo } from 'react';
import {
  Drawer, Box, Typography, IconButton, List, ListItem,
  ListItemText, Chip, Divider, Button, Avatar
} from '@mui/material';
import { CloseOutlined, CheckDoneOutlined, NotificationsOffOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  selectNotifications, selectIsPanelOpen, togglePanel,
  markAsRead, markAllAsRead, clearAll
} from '../slices/notificationsSlice';
import { formatRelativeTime } from '@utils/formatters';
import type { Notification } from '@types/api.types';

const TYPE_COLORS = {
  info: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;

const NotificationItem = memo(({ n, onRead }: { n: Notification; onRead: (id: string) => void }) => (
  <ListItem
    alignItems="flex-start"
    onClick={() => !n.read && onRead(n.id)}
    sx={{
      cursor: n.read ? 'default' : 'pointer',
      bgcolor: n.read ? 'transparent' : 'rgba(99,102,241,0.05)',
      borderLeft: `3px solid ${n.read ? 'transparent' : TYPE_COLORS[n.type]}`,
      borderRadius: 1,
      mb: 0.5,
      transition: 'all 0.2s',
      '&:hover': { bgcolor: 'rgba(99,102,241,0.08)' },
    }}
  >
    <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
      <Avatar
        sx={{
          width: 32, height: 32, mt: 0.5,
          bgcolor: `${TYPE_COLORS[n.type]}22`,
          color: TYPE_COLORS[n.type],
          fontSize: '0.75rem',
          flexShrink: 0,
        }}
      >
        {n.type.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 600, fontSize: '0.8rem' }} noWrap>
            {n.title}
          </Typography>
          {!n.read && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: 0.7 }} />}
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.4 }}>
          {n.message}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem' }}>
          {formatRelativeTime(n.timestamp)}
        </Typography>
      </Box>
    </Box>
  </ListItem>
));
NotificationItem.displayName = 'NotificationItem';

export const NotificationPanel = memo(() => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const isOpen = useAppSelector(selectIsPanelOpen);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => dispatch(togglePanel())}
      PaperProps={{
        sx: {
          width: 360,
          background: 'rgba(10,15,30,0.97)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(99,102,241,0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 700, fontSize: '0.95rem' }}>
            Notifications
          </Typography>
          <Chip
            label={notifications.filter((n) => !n.read).length}
            size="small"
            color="primary"
            sx={{ mr: 1, height: 20, fontSize: 11 }}
          />
          <IconButton size="small" onClick={() => dispatch(togglePanel())} sx={{ color: 'text.secondary' }}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>

        {/* Actions */}
        <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Button size="small" onClick={() => dispatch(markAllAsRead())} sx={{ fontSize: '0.75rem', textTransform: 'none' }}>
            Mark all read
          </Button>
          <Button size="small" color="error" onClick={() => dispatch(clearAll())} sx={{ fontSize: '0.75rem', textTransform: 'none' }}>
            Clear all
          </Button>
        </Box>

        {/* List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
          {notifications.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2, opacity: 0.5 }}>
              <NotificationsOffOutlined sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">No notifications yet</Typography>
            </Box>
          ) : (
            <List dense disablePadding>
              {notifications.map((n) => (
                <NotificationItem key={n.id} n={n} onRead={(id) => dispatch(markAsRead(id))} />
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Drawer>
  );
});
NotificationPanel.displayName = 'NotificationPanel';
