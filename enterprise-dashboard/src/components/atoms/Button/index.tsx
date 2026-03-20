import React, { memo } from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const Button = memo<ButtonProps>(({ loading, loadingText, children, disabled, ...props }) => (
  <MuiButton
    {...props}
    disabled={disabled || loading}
    startIcon={loading ? <CircularProgress size={14} color="inherit" /> : props.startIcon}
  >
    {loading && loadingText ? loadingText : children}
  </MuiButton>
));

Button.displayName = 'Button';
