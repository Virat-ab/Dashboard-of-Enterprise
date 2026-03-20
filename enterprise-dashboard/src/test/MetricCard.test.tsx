import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from '@styles/theme/muiTheme';
import { MetricCard } from '@features/dashboard/components/MetricCard';
import type { MetricCard as MetricCardType } from '@types/api.types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);

const mockMetric: MetricCardType = {
  id: 'revenue',
  title: 'Total Revenue',
  value: 2_847_329,
  previousValue: 2_541_200,
  change: 306_129,
  changePercent: 12.04,
  trend: 'up',
  unit: '$',
  icon: 'TrendingUp',
  color: '#22c55e',
};

describe('MetricCard', () => {
  it('renders the metric title', () => {
    render(<MetricCard metric={mockMetric} />, { wrapper });
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  it('renders formatted currency value', () => {
    render(<MetricCard metric={mockMetric} />, { wrapper });
    expect(screen.getByText('$2.8M')).toBeInTheDocument();
  });

  it('renders positive change percentage', () => {
    render(<MetricCard metric={mockMetric} />, { wrapper });
    expect(screen.getByText('+12.04%')).toBeInTheDocument();
  });

  it('renders skeleton when loading', () => {
    render(<MetricCard metric={{} as MetricCardType} loading />, { wrapper });
    // Skeletons render as MUI Skeleton — no title visible
    expect(screen.queryByText('Total Revenue')).not.toBeInTheDocument();
  });

  it('renders percentage value correctly', () => {
    render(<MetricCard metric={{ ...mockMetric, value: 4.27, unit: '%' }} />, { wrapper });
    expect(screen.getByText('4.27%')).toBeInTheDocument();
  });

  it('renders down trend for negative change', () => {
    render(<MetricCard metric={{ ...mockMetric, trend: 'down', changePercent: -6.61 }} />, { wrapper });
    expect(screen.getByText('-6.61%')).toBeInTheDocument();
  });
});
