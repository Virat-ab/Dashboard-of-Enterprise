import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@features/auth/slices/authSlice';
import dashboardReducer from '@features/dashboard/slices/dashboardSlice';
import notificationsReducer from '@features/notifications/slices/notificationsSlice';
import { apiMiddleware } from './middleware/apiMiddleware';
import { loggerMiddleware } from './middleware/loggerMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  notifications: notificationsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiMiddleware)
      .concat(loggerMiddleware),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
