// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
  lastLoginAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  dashboardLayout: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export interface MetricCard {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
  category?: string;
}

export interface TimeSeriesData {
  id: string;
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface DashboardStats {
  metrics: MetricCard[];
  revenue: TimeSeriesData[];
  users: TimeSeriesData[];
  conversions: TimeSeriesData[];
  topProducts: ProductMetric[];
  recentActivity: ActivityItem[];
}

export interface ProductMetric {
  id: string;
  name: string;
  revenue: number;
  units: number;
  growth: number;
  category: string;
}

export interface ActivityItem {
  id: string;
  type: 'sale' | 'signup' | 'refund' | 'alert' | 'system';
  title: string;
  description: string;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// ─── WebSocket Events ─────────────────────────────────────────────────────────
export type WSEventType =
  | 'metrics_update'
  | 'notification'
  | 'user_activity'
  | 'system_alert'
  | 'chart_update';

export interface WSMessage<T = unknown> {
  type: WSEventType;
  payload: T;
  timestamp: string;
}

// ─── Table ────────────────────────────────────────────────────────────────────
export interface Column<T> {
  id: keyof T | string;
  label: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  format?: (value: unknown) => string;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  operator: 'eq' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
  value: unknown;
}
