import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardStats, MetricCard, TimeSeriesData } from '@types/api.types';
import { dashboardAPI } from '@services/api/dashboardAPI';

type TimeRange = '24h' | '7d' | '30d' | '90d';

interface DashboardState {
  stats: DashboardStats | null;
  selectedTimeRange: TimeRange;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isRealTimeEnabled: boolean;
}

const initialState: DashboardState = {
  stats: null,
  selectedTimeRange: '7d',
  loading: false,
  error: null,
  lastUpdated: null,
  isRealTimeEnabled: true,
};

export const fetchDashboardStats = createAsyncThunk<DashboardStats, TimeRange>(
  'dashboard/fetchStats',
  async (timeRange, { rejectWithValue }) => {
    try {
      return await dashboardAPI.getStats(timeRange);
    } catch (err: unknown) {
      const error = err as { message?: string };
      return rejectWithValue(error.message ?? 'Failed to fetch dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.selectedTimeRange = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<MetricCard[]>) => {
      if (state.stats) {
        state.stats.metrics = action.payload;
        state.lastUpdated = new Date().toISOString();
      }
    },
    appendChartData: (state, action: PayloadAction<{ seriesId: string; data: TimeSeriesData['data'] }>) => {
      if (!state.stats) return;
      const update = (series: TimeSeriesData[]) => {
        const found = series.find((s) => s.id === action.payload.seriesId);
        if (found) {
          found.data = [...found.data, ...action.payload.data].slice(-100);
        }
      };
      update(state.stats.revenue);
      update(state.stats.users);
      update(state.stats.conversions);
    },
    toggleRealTime: (state) => {
      state.isRealTimeEnabled = !state.isRealTimeEnabled;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTimeRange, updateMetrics, appendChartData, toggleRealTime } = dashboardSlice.actions;
export default dashboardSlice.reducer;

export const selectDashboardStats = (state: { dashboard: DashboardState }) => state.dashboard.stats;
export const selectTimeRange = (state: { dashboard: DashboardState }) => state.dashboard.selectedTimeRange;
export const selectDashboardLoading = (state: { dashboard: DashboardState }) => state.dashboard.loading;
export const selectLastUpdated = (state: { dashboard: DashboardState }) => state.dashboard.lastUpdated;
export const selectIsRealTimeEnabled = (state: { dashboard: DashboardState }) => state.dashboard.isRealTimeEnabled;
