export const APP_NAME = 'Enterprise Dashboard';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  REPORTS: '/reports',
  USERS: '/users',
  SETTINGS: '/settings',
} as const;

export const TIME_RANGES = ['24h', '7d', '30d', '90d'] as const;
export type TimeRange = (typeof TIME_RANGES)[number];

export const CHART_COLORS = {
  primary: '#6366f1',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  purple: '#a855f7',
} as const;

export const PAGINATION_DEFAULTS = {
  page: 0,
  pageSize: 10,
  rowsPerPageOptions: [10, 25, 50, 100],
} as const;

export const WS_RECONNECT_DELAY_MS = 1000;
export const WS_MAX_RECONNECT_DELAY_MS = 30_000;
export const DEBOUNCE_DELAY_MS = 250;
export const STALE_TIME_MS = 60_000;

export const EXPORT_FORMATS = ['csv', 'pdf', 'png'] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number];
