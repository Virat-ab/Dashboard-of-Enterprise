import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  fetchDashboardStats,
  selectDashboardStats,
  selectTimeRange,
  selectDashboardLoading,
  selectLastUpdated,
  selectIsRealTimeEnabled,
  setTimeRange,
  toggleRealTime,
} from '../slices/dashboardSlice';

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const timeRange = useAppSelector(selectTimeRange);
  const loading = useAppSelector(selectDashboardLoading);
  const lastUpdated = useAppSelector(selectLastUpdated);
  const isRealTimeEnabled = useAppSelector(selectIsRealTimeEnabled);

  useEffect(() => {
    dispatch(fetchDashboardStats(timeRange));
  }, [dispatch, timeRange]);

  const refresh = useCallback(() => {
    dispatch(fetchDashboardStats(timeRange));
  }, [dispatch, timeRange]);

  const changeTimeRange = useCallback(
    (range: Parameters<typeof setTimeRange>[0]) => dispatch(setTimeRange(range)),
    [dispatch]
  );

  const toggleLive = useCallback(() => dispatch(toggleRealTime()), [dispatch]);

  return { stats, timeRange, loading, lastUpdated, isRealTimeEnabled, refresh, changeTimeRange, toggleLive };
};
