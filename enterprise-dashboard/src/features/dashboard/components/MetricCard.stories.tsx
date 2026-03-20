import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from '@features/dashboard/components/MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Dashboard/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

const baseMetric = {
  id: 'revenue',
  title: 'Total Revenue',
  value: 2_847_329,
  previousValue: 2_541_200,
  change: 306_129,
  changePercent: 12.04,
  trend: 'up' as const,
  unit: '$',
  icon: 'TrendingUp',
  color: '#22c55e',
};

export const Revenue: Story = { args: { metric: baseMetric } };

export const Users: Story = {
  args: {
    metric: { ...baseMetric, id: 'users', title: 'Active Users', value: 142_857, unit: '', color: '#3b82f6' },
  },
};

export const NegativeTrend: Story = {
  args: {
    metric: { ...baseMetric, id: 'orders', title: 'Total Orders', value: 38_291, changePercent: -6.61, trend: 'down', color: '#f59e0b', unit: '' },
  },
};

export const Percentage: Story = {
  args: {
    metric: { ...baseMetric, id: 'conv', title: 'Conversion Rate', value: 4.27, unit: '%', color: '#a855f7', changePercent: 7.29 },
  },
};

export const Loading: Story = { args: { metric: baseMetric, loading: true } };
