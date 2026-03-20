import React, { memo, useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  FormControlLabel, Checkbox, Alert, InputAdornment, IconButton, Chip
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined, LockOutlined, EmailOutlined } from '@mui/icons-material';
import { useAuth } from '@features/auth/hooks/useAuth';

const LoginPage = memo(() => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('admin@enterprise.com');
  const [password, setPassword] = useState('password');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password, rememberMe });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 420, px: 2 }}>
      {/* Logo */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            width: 56, height: 56, borderRadius: 2.5, mx: 'auto', mb: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #22c55e 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>E</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Welcome back</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Sign in to your enterprise account
        </Typography>
      </Box>

      <Card
        sx={{
          border: '1px solid rgba(99,102,241,0.2)',
          background: 'rgba(15,22,41,0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}
      >
        <CardContent sx={{ p: 3.5 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, fontSize: '0.8rem' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPass((p) => !p)} edge="end">
                      {showPass
                        ? <VisibilityOffOutlined sx={{ fontSize: 18 }} />
                        : <VisibilityOutlined sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ p: 0.5 }}
                  />
                }
                label={<Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Remember me</Typography>}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem', color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              size="large"
              sx={{
                mt: 0.5,
                py: 1.25,
                fontWeight: 600,
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                '&:hover': { boxShadow: '0 6px 28px rgba(99,102,241,0.6)' },
                '&:disabled': { opacity: 0.7 },
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Demo hint */}
      <Box sx={{ mt: 2.5, textAlign: 'center' }}>
        <Chip
          label="Demo: admin@enterprise.com / password"
          size="small"
          sx={{
            fontSize: '0.7rem', height: 24,
            bgcolor: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            color: 'text.secondary',
          }}
        />
      </Box>
    </Box>
  );
});

LoginPage.displayName = 'LoginPage';
export default LoginPage;
