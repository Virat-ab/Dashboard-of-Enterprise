import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, {
  addNotification, markAsRead, markAllAsRead,
  removeNotification, clearAll, selectUnreadCount,
} from '@features/notifications/slices/notificationsSlice';
import type { Notification } from '@types/api.types';

const makeStore = () => configureStore({ reducer: { notifications: notificationsReducer } });

const makeNotif = (id: string, read = false): Notification => ({
  id, type: 'info', title: `Notification ${id}`, message: 'Test message',
  timestamp: new Date().toISOString(), read,
});

describe('notificationsSlice', () => {
  it('starts with empty state', () => {
    const store = makeStore();
    expect(store.getState().notifications.items).toHaveLength(0);
    expect(selectUnreadCount(store.getState())).toBe(0);
  });

  it('adds a notification and increments unread count', () => {
    const store = makeStore();
    store.dispatch(addNotification(makeNotif('1')));
    expect(store.getState().notifications.items).toHaveLength(1);
    expect(selectUnreadCount(store.getState())).toBe(1);
  });

  it('does not increment unread for already-read notifications', () => {
    const store = makeStore();
    store.dispatch(addNotification(makeNotif('1', true)));
    expect(selectUnreadCount(store.getState())).toBe(0);
  });

  it('marks a notification as read', () => {
    const store = makeStore();
    store.dispatch(addNotification(makeNotif('1')));
    store.dispatch(markAsRead('1'));
    expect(store.getState().notifications.items[0].read).toBe(true);
    expect(selectUnreadCount(store.getState())).toBe(0);
  });

  it('marks all notifications as read', () => {
    const store = makeStore();
    store.dispatch(addNotification(makeNotif('1')));
    store.dispatch(addNotification(makeNotif('2')));
    store.dispatch(markAllAsRead());
    expect(selectUnreadCount(store.getState())).toBe(0);
    store.getState().notifications.items.forEach((n) => expect(n.read).toBe(true));
  });

  it('removes a notification', () => {
    const store = makeStore();
    store.dispatch(addNotification(makeNotif('1')));
    store.dispatch(removeNotification('1'));
    expect(store.getState().notifications.items).toHaveLength(0);
  });

  it('clears all notifications', () => {
    const store = makeStore();
    store.dispatch(addNotification(makeNotif('1')));
    store.dispatch(addNotification(makeNotif('2')));
    store.dispatch(clearAll());
    expect(store.getState().notifications.items).toHaveLength(0);
    expect(selectUnreadCount(store.getState())).toBe(0);
  });
});
