import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const loggerMiddleware: Middleware<object, RootState> = (store) => (next) => (action) => {
  if (!import.meta.env.DEV) return next(action);

  const actionType = typeof action === 'object' && action !== null && 'type' in action
    ? (action as { type: string }).type
    : 'UNKNOWN';

  console.group(`%c[Redux] ${actionType}`, 'color: #7c3aed; font-weight: bold');
  console.log('%cPrev State:', 'color: #6b7280', store.getState());
  console.log('%cAction:', 'color: #2563eb', action);
  const result = next(action);
  console.log('%cNext State:', 'color: #059669', store.getState());
  console.groupEnd();
  return result;
};
