import React, { useEffect, useCallback, memo } from 'react';
import { Grid, Box, Typography, Button, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import { RefreshOutlined, FileDownloadOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  fetchDashboardStats, setTimeRange, updateMetrics, appendChartData,
  selectDashboardStats, selectTimeRange, selectDashboardLoading,
  selectLastUpdated, selectIsRealTimeEnabled
} from '@features/dashboard/slices/dashboardSlice';
import { addNotification } from '@features/notifications/slices/notificationsSlice';
import { selectCurrentUser } from '@features/auth/slices/authSlice';
import { MetricCard } from '@features/dashboard/components/MetricCard';
import { RevenueChart } from '@features/dashboard/components/RevenueChart';
import { TopProducts } from '@features/dashboard/components/TopProducts';
import { ActivityFeed } from '@features/dashboard/components/ActivityFeed';
import { useWebSocket } from '@hooks/useWebSocket';
import { formatRelativeTime } from '@utils/formatters';
import type { MetricCard as MetricCardType, Notification } from '@types/api.types';

const TIME_RANGES = [
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
] as const;

const DashboardPage = memo(() => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const timeRange = useAppSelector(selectTimeRange);
  const loading = useAppSelector(selectDashboardLoading);
  const lastUpdated = useAppSelector(selectLastUpdated);
  const isRealTime = useAppSelector(selectIsRealTimeEnabled);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchDashboardStats(timeRange));
  }, [dispatch, timeRange]);

  // Real-time metrics update handler
  useWebSocket<{ metrics: MetricCardType[] }>(
    'metrics_update',
    useCallback(({ metrics }) => {
      dispatch(updateMetrics(metrics));
    }, [dispatch]),
    isRealTime
  );

  // Real-time notification handler
  useWebSocket<Notification>(
    'notification',
    useCallback((notif) => {
      dispatch(addNotification(notif));
    }, [dispatch]),
    isRealTime
  );

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Welcome back, {user?.name}
            </Typography>
            {lastUpdated && (
              <Chip
                label={`Updated ${formatRelativeTime(lastUpdated)}`}
                size="small"
                sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(99,102,241,0.1)', color: 'text.secondary' }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            size="small"
            onChange={(_, v) => v && dispatch(setTimeRange(v))}
            sx={{ '& .MuiToggleButton-root': { px: 1.5, py: 0.5, fontSize: '0.75rem', fontWeight: 500, textTransform: 'none' } }}
          >
            {TIME_RANGES.map((r) => (
              <ToggleButton key={r.value} value={r.value}>{r.label}</ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshOutlined />}
            onClick={() => dispatch(fetchDashboardStats(timeRange))}
            disabled={loading}
            sx={{ fontSize: '0.8rem', textTransform: 'none' }}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<FileDownloadOutlined />}
            sx={{ fontSize: '0.8rem', textTransform: 'none' }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Metric cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {loading && !stats
          ? Array.from({ length: 4 }, (_, i) => (
            <Grid item xs={12} sm={6} lg={3} key={i}>
              <MetricCard metric={{} as MetricCardType} loading />
            </Grid>
          ))
          : stats?.metrics.map((metric) => (
            <Grid item xs={12} sm={6} lg={3} key={metric.id}>
              <MetricCard metric={metric} />
            </Grid>
          ))
        }
      </Grid>

      {/* Charts row */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ height: 320 }}>
            <RevenueChart data={stats?.revenue ?? []} loading={loading && !stats} title="Revenue & Expenses" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{ height: 320 }}>
            <RevenueChart data={stats?.users ?? []} loading={loading && !stats} title="User Growth" isCurrency={false} />
          </Box>
        </Grid>
      </Grid>

      {/* Bottom row */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={7}>
          <TopProducts products={stats?.topProducts} loading={loading && !stats} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <ActivityFeed activities={stats?.recentActivity} loading={loading && !stats} />
        </Grid>
      </Grid>
    </Box>
  );
});

DashboardPage.displayName = 'DashboardPage';
export default DashboardPage;
