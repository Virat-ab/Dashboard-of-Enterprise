import React, { memo } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Skeleton, List, ListItem } from '@mui/material';
import {
  ShoppingCartOutlined, PersonAddOutlined, UndoOutlined,
  WarningAmberOutlined, CloudDoneOutlined
} from '@mui/icons-material';
import type { ActivityItem } from '@types/api.types';
import { formatRelativeTime } from '@utils/formatters';

const ICONS = {
  sale: { icon: ShoppingCartOutlined, color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  signup: { icon: PersonAddOutlined, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  refund: { icon: UndoOutlined, color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  alert: { icon: WarningAmberOutlined, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  system: { icon: CloudDoneOutlined, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
} as const;

interface ActivityFeedProps {
  activities?: ActivityItem[];
  loading?: boolean;
}

export const ActivityFeed = memo<ActivityFeedProps>(({ activities = [], loading }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ p: 2.5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5 }}>
        Recent Activity
      </Typography>
      <List disablePadding sx={{ maxHeight: 380, overflowY: 'auto' }}>
        {loading
          ? Array.from({ length: 6 }, (_, i) => (
            <ListItem key={i} disablePadding sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                <Skeleton variant="circular" width={36} height={36} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton height={16} width="70%" />
                  <Skeleton height={13} width="90%" sx={{ mt: 0.3 }} />
                </Box>
              </Box>
            </ListItem>
          ))
          : activities.map((item) => {
            const cfg = ICONS[item.type];
            const Icon = cfg.icon;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 1.25 }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', width: '100%' }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: cfg.bg, flexShrink: 0 }}>
                    <Icon sx={{ fontSize: 16, color: cfg.color }} />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }} noWrap>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.3 }} noWrap>
                      {item.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem' }}>
                      {formatRelativeTime(item.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            );
          })
        }
      </List>
    </CardContent>
  </Card>
));

ActivityFeed.displayName = 'ActivityFeed';
