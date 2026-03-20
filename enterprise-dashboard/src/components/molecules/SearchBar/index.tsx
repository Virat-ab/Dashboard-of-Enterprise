import React, { memo, useRef } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { SearchOutlined, CloseOutlined } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: number | string;
  autoFocus?: boolean;
}

export const SearchBar = memo<SearchBarProps>(({
  value, onChange, placeholder = 'Search…', width = 280, autoFocus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <TextField
      inputRef={inputRef}
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
      sx={{ width }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton size="small" edge="end" onClick={() => { onChange(''); inputRef.current?.focus(); }}>
              <CloseOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
});

SearchBar.displayName = 'SearchBar';
