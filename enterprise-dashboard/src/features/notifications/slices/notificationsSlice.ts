import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '@types/api.types';

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  isOpen: boolean;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  isOpen: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
      if (!action.payload.read) state.unreadCount++;
      // Cap at 50
      if (state.items.length > 50) state.items = state.items.slice(0, 50);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const n = state.items.find((i) => i.id === action.payload);
      if (n && !n.read) { n.read = true; state.unreadCount = Math.max(0, state.unreadCount - 1); }
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => { n.read = true; });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx !== -1) {
        if (!state.items[idx].read) state.unreadCount = Math.max(0, state.unreadCount - 1);
        state.items.splice(idx, 1);
      }
    },
    clearAll: (state) => { state.items = []; state.unreadCount = 0; },
    togglePanel: (state) => { state.isOpen = !state.isOpen; },
  },
});

export const { addNotification, markAsRead, markAllAsRead, removeNotification, clearAll, togglePanel } = notificationsSlice.actions;
export default notificationsSlice.reducer;

export const selectNotifications = (state: { notifications: NotificationsState }) => state.notifications.items;
export const selectUnreadCount = (state: { notifications: NotificationsState }) => state.notifications.unreadCount;
export const selectIsPanelOpen = (state: { notifications: NotificationsState }) => state.notifications.isOpen;
