import React, { memo, useMemo, useState } from 'react';
import {
  Card, CardContent, Typography, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TableSortLabel, Chip,
  LinearProgress, Skeleton
} from '@mui/material';
import { formatCurrency, formatNumber, formatPercent } from '@utils/formatters';
import type { ProductMetric } from '@types/api.types';

interface TopProductsProps {
  products?: ProductMetric[];
  loading?: boolean;
}

export const TopProducts = memo<TopProductsProps>(({ products = [], loading }) => {
  const [sortField, setSortField] = useState<keyof ProductMetric>('revenue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = useMemo(() =>
    [...products].sort((a, b) => {
      const va = a[sortField] as number, vb = b[sortField] as number;
      return sortDir === 'desc' ? vb - va : va - vb;
    }),
    [products, sortField, sortDir]
  );

  const maxRevenue = products[0]?.revenue ?? 1;

  const handleSort = (field: keyof ProductMetric) => {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>
          Top Products
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === 'revenue'} direction={sortDir}
                    onClick={() => handleSort('revenue')}
                  >Revenue</TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === 'units'} direction={sortDir}
                    onClick={() => handleSort('units')}
                  >Units</TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === 'growth'} direction={sortDir}
                    onClick={() => handleSort('growth')}
                  >Growth</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }, (_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 4 }, (_, j) => (
                      <TableCell key={j}><Skeleton height={20} /></TableCell>
                    ))}
                  </TableRow>
                ))
                : sorted.map((p) => (
                  <TableRow key={p.id} sx={{ '&:hover': { bgcolor: 'rgba(99,102,241,0.04)' } }}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>{p.name}</Typography>
                        <Chip label={p.category} size="small" sx={{ height: 16, fontSize: 10, mt: 0.25 }} />
                        <LinearProgress
                          variant="determinate"
                          value={(p.revenue / maxRevenue) * 100}
                          sx={{ mt: 0.5, height: 3, bgcolor: 'rgba(99,102,241,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#6366f1' } }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {formatCurrency(p.revenue, 'USD', true)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {formatNumber(p.units, true)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatPercent(p.growth)}
                        size="small"
                        sx={{
                          height: 20, fontSize: 10, fontWeight: 600,
                          bgcolor: p.growth >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                          color: p.growth >= 0 ? '#22c55e' : '#ef4444',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
});

TopProducts.displayName = 'TopProducts';
