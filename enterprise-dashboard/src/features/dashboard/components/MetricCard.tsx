import React, { memo } from 'react';
import { Box, Card, CardContent, Typography, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';
import { formatCurrency, formatNumber, formatPercent } from '@utils/formatters';
import type { MetricCard as MetricCardType } from '@types/api.types';

interface MetricCardProps {
  metric: MetricCardType;
  loading?: boolean;
}

export const MetricCard = memo<MetricCardProps>(({ metric, loading }) => {
  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={44} sx={{ my: 1 }} />
          <Skeleton variant="text" width="50%" height={18} />
        </CardContent>
      </Card>
    );
  }

  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : TrendingFlat;
  const trendColor = metric.trend === 'up' ? '#22c55e' : metric.trend === 'down' ? '#ef4444' : '#94a3b8';
  const displayValue = metric.unit === '$'
    ? formatCurrency(metric.value, 'USD', true)
    : metric.unit === '%'
    ? `${metric.value.toFixed(2)}%`
    : formatNumber(metric.value, true);

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 32px rgba(99,102,241,0.15)`,
        },
      }}
    >
      {/* Accent gradient bar */}
      <Box
        sx={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${metric.color}, transparent)`,
        }}
      />

      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.8rem' }}>
            {metric.title}
          </Typography>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: `${metric.color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Box sx={{ color: metric.color, fontSize: 18, lineHeight: 1, display: 'flex' }}>
              <TrendIcon sx={{ fontSize: 18, color: metric.color }} />
            </Box>
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {displayValue}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendIcon sx={{ fontSize: 14, color: trendColor }} />
          <Typography variant="caption" sx={{ color: trendColor, fontWeight: 600 }}>
            {formatPercent(metric.changePercent)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            vs last period
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

MetricCard.displayName = 'MetricCard';
