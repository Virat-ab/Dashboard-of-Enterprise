import React, { memo, useMemo } from 'react';
import { Card, CardContent, Box, Typography, ToggleButton, ToggleButtonGroup, Skeleton } from '@mui/material';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, Legend
} from 'recharts';
import { format } from 'date-fns';
import type { TimeSeriesData } from '@types/api.types';
import { formatCurrency } from '@utils/formatters';

interface RevenueChartProps {
  data: TimeSeriesData[];
  loading?: boolean;
  title?: string;
  isCurrency?: boolean;
}

const CustomTooltip = ({ active, payload, label, isCurrency }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: 'rgba(15,22,41,0.95)', border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 2, p: 1.5, backdropFilter: 'blur(10px)',
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((p: any) => (
        <Box key={p.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.color }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {p.name}: {isCurrency ? formatCurrency(p.value, 'USD', true) : p.value.toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export const RevenueChart = memo<RevenueChartProps>(({ data, loading, title = 'Revenue Overview', isCurrency = true }) => {
  const chartData = useMemo(() => {
    if (!data?.length) return [];
    const maxLen = Math.max(...data.map((s) => s.data.length));
    return Array.from({ length: maxLen }, (_, i) => {
      const point: Record<string, unknown> = {
        label: data[0]?.data[i]?.label ?? `Point ${i}`,
        timestamp: data[0]?.data[i]?.timestamp,
      };
      data.forEach((series) => {
        point[series.name] = series.data[i]?.value ?? 0;
      });
      return point;
    });
  }, [data]);

  if (loading) {
    return (
      <Card sx={{ height: 320 }}>
        <CardContent>
          <Skeleton width="40%" height={24} />
          <Skeleton variant="rectangular" height={240} sx={{ mt: 2, borderRadius: 1 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{title}</Typography>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                {data.map((series) => (
                  <linearGradient key={series.id} id={`grad-${series.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={series.color ?? '#6366f1'} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={series.color ?? '#6366f1'} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => isCurrency ? formatCurrency(v, 'USD', true) : v.toLocaleString()}
                width={65}
              />
              <RechartsTooltip content={<CustomTooltip isCurrency={isCurrency} />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="circle"
                iconSize={8}
              />
              {data.map((series) => (
                <Area
                  key={series.id}
                  type="monotone"
                  dataKey={series.name}
                  stroke={series.color ?? '#6366f1'}
                  strokeWidth={2}
                  fill={`url(#grad-${series.id})`}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
});

RevenueChart.displayName = 'RevenueChart';
