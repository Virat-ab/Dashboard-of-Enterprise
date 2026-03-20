import React, { memo, useState } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, TextField,
  Button, Avatar, Switch, FormControlLabel, Divider, Chip, Alert
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { selectCurrentUser, updateUser } from '@features/auth/slices/authSlice';

const SettingsPage = memo(() => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '' });
  const [notifs, setNotifs] = useState(user?.preferences.notifications ?? true);

  const handleSave = () => {
    dispatch(updateUser({ name: form.name, email: form.email, preferences: { ...user!.preferences, notifications: notifs } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Settings</Typography>

      <Grid container spacing={2.5}>
        {/* Profile */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>Profile</Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar src={user?.avatar} sx={{ width: 64, height: 64, fontSize: '1.4rem', background: 'linear-gradient(135deg, #6366f1, #22c55e)' }}>
                  {user?.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                  <Chip label={user?.role} size="small" color="primary" sx={{ height: 20, fontSize: 10 }} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name" value={form.name} fullWidth
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <TextField
                  label="Email" value={form.email} fullWidth type="email"
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>Preferences</Typography>

              <FormControlLabel
                control={<Switch checked={notifs} onChange={(e) => setNotifs(e.target.checked)} color="primary" />}
                label={<Box><Typography variant="body2" sx={{ fontWeight: 500 }}>Push Notifications</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Receive alerts and updates</Typography></Box>}
                sx={{ mb: 2, alignItems: 'flex-start', '& .MuiSwitch-root': { mt: 0.25 } }}
              />
              <Divider sx={{ borderColor: 'divider', my: 2 }} />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label={<Box><Typography variant="body2" sx={{ fontWeight: 500 }}>Real-time Updates</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Auto-refresh dashboard data</Typography></Box>}
                sx={{ mb: 2, alignItems: 'flex-start', '& .MuiSwitch-root': { mt: 0.25 } }}
              />
              <Divider sx={{ borderColor: 'divider', my: 2 }} />
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label={<Box><Typography variant="body2" sx={{ fontWeight: 500 }}>Dark Mode</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Use dark color scheme</Typography></Box>}
                sx={{ alignItems: 'flex-start', '& .MuiSwitch-root': { mt: 0.25 } }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* API Keys */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>API Access</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  label="API Key" value="ent-••••••••••••••••••••3f9a" fullWidth
                  InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '0.85rem' } }}
                  sx={{ flex: 1, minWidth: 200 }}
                />
                <Button variant="outlined" sx={{ textTransform: 'none', flexShrink: 0 }}>Regenerate</Button>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                Last used: 2 hours ago · Rate limit: 10,000 req/hour
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {saved && (
          <Grid item xs={12}>
            <Alert severity="success" sx={{ borderRadius: 2 }}>Settings saved successfully.</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave} sx={{ textTransform: 'none', px: 4 }}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});

SettingsPage.displayName = 'SettingsPage';
export default SettingsPage;
