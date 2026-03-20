import React, { useEffect, memo } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis
} from 'recharts';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchDashboardStats, selectDashboardStats, selectTimeRange, selectDashboardLoading } from '@features/dashboard/slices/dashboardSlice';
import { formatCurrency } from '@utils/formatters';

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

const AnalyticsPage = memo(() => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const timeRange = useAppSelector(selectTimeRange);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    if (!stats) dispatch(fetchDashboardStats(timeRange));
  }, [dispatch, stats, timeRange]);

  const categoryData = stats?.topProducts.map((p) => ({
    name: p.category, value: p.revenue, units: p.units,
  })) ?? [];

  const radarData = [
    { subject: 'Revenue', A: 92, B: 78 },
    { subject: 'Users', A: 85, B: 71 },
    { subject: 'Retention', A: 76, B: 88 },
    { subject: 'Conversion', A: 89, B: 65 },
    { subject: 'Satisfaction', A: 94, B: 82 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Analytics</Typography>

      <Grid container spacing={2.5}>
        {/* Bar chart */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>
                Product Revenue Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats?.topProducts ?? []} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, 'USD', true)} width={65} />
                  <Tooltip formatter={(v: number) => formatCurrency(v, 'USD')} contentStyle={{ background: '#0f1629', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8 }} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie chart */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>
                Revenue by Category
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="45%" outerRadius={90} innerRadius={50} dataKey="value" paddingAngle={3}>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v, 'USD', true)} contentStyle={{ background: '#0f1629', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8 }} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Radar chart */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>
                Performance Radar
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(99,102,241,0.15)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Radar name="This Period" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  <Radar name="Last Period" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversion funnel */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>
                Conversion Funnel
              </Typography>
              {[
                { stage: 'Visitors', value: 142857, pct: 100 },
                { stage: 'Leads', value: 38291, pct: 26.8 },
                { stage: 'Prospects', value: 12430, pct: 8.7 },
                { stage: 'Customers', value: 6090, pct: 4.3 },
              ].map((row, i) => (
                <Box key={row.stage} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{row.stage}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                      {row.value.toLocaleString()} ({row.pct}%)
                    </Typography>
                  </Box>
                  <Box sx={{ height: 24, bgcolor: 'rgba(99,102,241,0.08)', borderRadius: 1, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: '100%', width: `${row.pct}%`, borderRadius: 1,
                        background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i]}aa)`,
                        transition: 'width 1s ease',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
});

AnalyticsPage.displayName = 'AnalyticsPage';
export default AnalyticsPage;
