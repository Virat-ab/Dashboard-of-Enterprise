import type { DashboardStats, MetricCard, TimeSeriesData, ActivityItem, ProductMetric } from '@types/api.types';
import { subDays, subHours, format } from 'date-fns';

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

function generateTimeSeries(points: number, base: number, variance: number, intervalHours = 1): TimeSeriesData['data'] {
  return Array.from({ length: points }, (_, i) => ({
    timestamp: subHours(new Date(), (points - i) * intervalHours).toISOString(),
    value: Math.max(0, base + rand(-variance, variance) + i * (base * 0.002)),
    label: format(subHours(new Date(), (points - i) * intervalHours), 'MMM d HH:mm'),
  }));
}

function generateDailyTimeSeries(days: number, base: number, variance: number): TimeSeriesData['data'] {
  return Array.from({ length: days }, (_, i) => ({
    timestamp: subDays(new Date(), days - i).toISOString(),
    value: Math.max(0, base + rand(-variance, variance) + i * (base * 0.01)),
    label: format(subDays(new Date(), days - i), 'MMM d'),
  }));
}

export function generateMockStats(timeRange: string): DashboardStats {
  const pointsMap: Record<string, number> = { '24h': 24, '7d': 7, '30d': 30, '90d': 90 };
  const days = pointsMap[timeRange] ?? 7;
  const isHourly = timeRange === '24h';
  const genSeries = isHourly
    ? (base: number, v: number) => generateTimeSeries(days, base, v)
    : (base: number, v: number) => generateDailyTimeSeries(days, base, v);

  const metrics: MetricCard[] = [
    {
      id: 'revenue', title: 'Total Revenue', value: 2_847_329, previousValue: 2_541_200,
      change: 306_129, changePercent: 12.04, trend: 'up', unit: '$', icon: 'TrendingUp', color: '#22c55e',
    },
    {
      id: 'users', title: 'Active Users', value: 142_857, previousValue: 138_234,
      change: 4_623, changePercent: 3.34, trend: 'up', unit: '', icon: 'People', color: '#3b82f6',
    },
    {
      id: 'orders', title: 'Total Orders', value: 38_291, previousValue: 41_002,
      change: -2_711, changePercent: -6.61, trend: 'down', unit: '', icon: 'ShoppingCart', color: '#f59e0b',
    },
    {
      id: 'conversion', title: 'Conversion Rate', value: 4.27, previousValue: 3.98,
      change: 0.29, changePercent: 7.29, trend: 'up', unit: '%', icon: 'Percent', color: '#a855f7',
    },
  ];

  const revenue: TimeSeriesData[] = [
    { id: 'revenue', name: 'Revenue', color: '#22c55e', data: genSeries(95_000, 15_000) },
    { id: 'expenses', name: 'Expenses', color: '#ef4444', data: genSeries(62_000, 8_000) },
  ];

  const users: TimeSeriesData[] = [
    { id: 'new_users', name: 'New Users', color: '#3b82f6', data: genSeries(4_200, 800) },
    { id: 'returning', name: 'Returning', color: '#8b5cf6', data: genSeries(7_800, 1_200) },
  ];

  const conversions: TimeSeriesData[] = [
    { id: 'conv_rate', name: 'Conversion %', color: '#f59e0b', data: genSeries(4.2, 0.8) },
  ];

  const topProducts: ProductMetric[] = [
    { id: '1', name: 'Enterprise Suite Pro', revenue: 842_000, units: 412, growth: 18.4, category: 'Software' },
    { id: '2', name: 'Analytics Platform', revenue: 631_500, units: 287, growth: 22.1, category: 'Software' },
    { id: '3', name: 'Cloud Storage 1TB', revenue: 412_300, units: 1_841, growth: -3.2, category: 'Cloud' },
    { id: '4', name: 'Security Shield', revenue: 318_900, units: 623, growth: 9.7, category: 'Security' },
    { id: '5', name: 'Dev Toolkit', revenue: 241_200, units: 932, growth: 31.5, category: 'Dev Tools' },
  ];

  const activityTypes = ['sale', 'signup', 'refund', 'alert', 'system'] as const;
  const recentActivity: ActivityItem[] = Array.from({ length: 12 }, (_, i) => ({
    id: `activity-${i}`,
    type: activityTypes[i % activityTypes.length],
    title: [
      'New Enterprise Sale', 'User Registered', 'Refund Processed',
      'System Alert', 'Deployment Complete', 'New Team Member',
      'Subscription Renewed', 'Invoice Paid', 'Trial Started',
      'Report Generated', 'API Limit Warning', 'Backup Complete',
    ][i],
    description: [
      'Enterprise Suite Pro — $12,400', 'john.doe@company.com joined',
      'Order #38291 refunded — $240', 'High memory usage on srv-03',
      'v2.4.1 deployed to production', 'Sarah Chen joined as Admin',
      'Acme Corp renewed for 2 years', 'Invoice #INV-2024-0892 paid',
      '14-day trial started by TechCorp', 'Q1 2024 report ready',
      '95% of monthly API quota used', 'Daily backup completed',
    ][i],
    timestamp: subHours(new Date(), rand(1, 48)).toISOString(),
    userId: rand(1, 100).toString(),
  }));

  return { metrics, revenue, users, conversions, topProducts, recentActivity };
}

export function generateMockNotifications(count = 5) {
  const types = ['info', 'success', 'warning', 'error'] as const;
  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${Date.now()}-${i}`,
    type: types[i % types.length],
    title: ['System Update', 'Goal Achieved', 'Quota Warning', 'Failed Sync'][i % 4],
    message: [
      'A new update v2.5.0 is available.',
      'Monthly revenue target reached!',
      'API quota at 90%. Upgrade soon.',
      'Data sync failed. Retrying...',
    ][i % 4],
    timestamp: new Date().toISOString(),
    read: false,
    actionUrl: i % 2 === 0 ? '/settings' : undefined,
    actionLabel: i % 2 === 0 ? 'View' : undefined,
  }));
}

export { rand, randFloat };
