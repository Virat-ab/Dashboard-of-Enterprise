import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  setCredentials, clearAuth, updateUser,
  selectCurrentUser, selectIsAuthenticated,
} from '@features/auth/slices/authSlice';
import type { LoginResponse } from '@types/api.types';

const makeStore = () =>
  configureStore({ reducer: { auth: authReducer } });

const mockLoginResponse: LoginResponse = {
  user: {
    id: '1', email: 'test@example.com', name: 'Test User',
    role: 'admin', avatar: undefined,
    preferences: { theme: 'dark', language: 'en', notifications: true, dashboardLayout: 'default' },
    createdAt: '2024-01-01T00:00:00Z', lastLoginAt: '2024-01-01T00:00:00Z',
  },
  tokens: { accessToken: 'access-token', refreshToken: 'refresh-token', expiresIn: 3600 },
};

describe('authSlice', () => {
  describe('reducers', () => {
    it('should return the initial state', () => {
      const store = makeStore();
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
    });

    it('should set credentials on setCredentials', () => {
      const store = makeStore();
      store.dispatch(setCredentials(mockLoginResponse));
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockLoginResponse.user);
      expect(state.accessToken).toBe('access-token');
    });

    it('should clear auth on clearAuth', () => {
      const store = makeStore();
      store.dispatch(setCredentials(mockLoginResponse));
      store.dispatch(clearAuth());
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it('should update user fields on updateUser', () => {
      const store = makeStore();
      store.dispatch(setCredentials(mockLoginResponse));
      store.dispatch(updateUser({ name: 'Updated Name' }));
      const state = store.getState().auth;
      expect(state.user?.name).toBe('Updated Name');
      expect(state.user?.email).toBe('test@example.com');
    });
  });

  describe('selectors', () => {
    it('selectCurrentUser returns null when not authenticated', () => {
      const store = makeStore();
      expect(selectCurrentUser(store.getState())).toBeNull();
    });

    it('selectIsAuthenticated returns true after login', () => {
      const store = makeStore();
      store.dispatch(setCredentials(mockLoginResponse));
      expect(selectIsAuthenticated(store.getState())).toBe(true);
    });
  });
});
