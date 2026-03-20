import React, { memo, useState, useMemo, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TablePagination, Box, TextField, InputAdornment,
  Skeleton, Typography, Chip
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useDebounce } from '@hooks/useDebounce';
import type { Column, SortConfig } from '@types/api.types';

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  'aria-label'?: string;
}

function DataTableInner<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  searchable = false,
  searchPlaceholder = 'Search…',
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  onRowClick,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortConfig>({ field: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [searchRaw, setSearchRaw] = useState('');
  const search = useDebounce(searchRaw, 250);

  const handleSort = useCallback((field: string) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setPage(0);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.id as keyof T];
        return String(val ?? '').toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sort.field) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sort.field as keyof T];
      const bv = b[sort.field as keyof T];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.direction === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sort]);

  const paginated = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage]
  );

  return (
    <Box>
      {searchable && (
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchRaw}
            onChange={(e) => { setSearchRaw(e.target.value); setPage(0); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 280 }}
          />
          {search && (
            <Chip
              label={`${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
              size="small"
              sx={{ ml: 1, height: 28 }}
            />
          )}
        </Box>
      )}

      <TableContainer>
        <Table size="small" aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  align={col.align ?? 'left'}
                  sx={{ width: col.width, whiteSpace: 'nowrap' }}
                >
                  {col.sortable !== false ? (
                    <TableSortLabel
                      active={sort.field === col.id}
                      direction={sort.field === col.id ? sort.direction : 'asc'}
                      onClick={() => handleSort(String(col.id))}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }, (_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.id)}>
                      <Skeleton height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
              : paginated.length === 0
                ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                      <Typography variant="body2" color="text.secondary">{emptyMessage}</Typography>
                    </TableCell>
                  </TableRow>
                )
                : paginated.map((row, rowIdx) => (
                  <TableRow
                    key={rowIdx}
                    hover
                    onClick={() => onRowClick?.(row)}
                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  >
                    {columns.map((col) => {
                      const rawValue = row[col.id as keyof T];
                      const displayed = col.render
                        ? col.render(rawValue, row)
                        : col.format
                          ? col.format(rawValue)
                          : String(rawValue ?? '—');
                      return (
                        <TableCell key={String(col.id)} align={col.align ?? 'left'}>
                          {displayed}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}
      />
    </Box>
  );
}

export const DataTable = memo(DataTableInner) as typeof DataTableInner;
