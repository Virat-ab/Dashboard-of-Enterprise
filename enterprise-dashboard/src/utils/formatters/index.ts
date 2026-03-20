import { format, formatDistanceToNow } from 'date-fns';

export const formatCurrency = (value: number, currency = 'USD', compact = false): string => {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
};

export const formatNumber = (value: number, compact = false): string => {
  if (compact && Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (compact && Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercent = (value: number, decimals = 2): string =>
  `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;

export const formatDate = (date: string | Date, pattern = 'MMM d, yyyy'): string =>
  format(new Date(date), pattern);

export const formatRelativeTime = (date: string | Date): string =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
