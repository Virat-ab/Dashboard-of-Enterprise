import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const apiMiddleware: Middleware<object, RootState> = (_store) => (next) => (action) => {
  // Track API call timings in dev
  if (import.meta.env.DEV && typeof action === 'object' && action !== null && 'type' in action) {
    const actionType = (action as { type: string }).type;
    if (actionType.endsWith('/pending')) {
      console.time(`[API] ${actionType}`);
    } else if (actionType.endsWith('/fulfilled') || actionType.endsWith('/rejected')) {
      const base = actionType.replace('/fulfilled', '').replace('/rejected', '') + '/pending';
      console.timeEnd(`[API] ${base}`);
    }
  }
  return next(action);
};
