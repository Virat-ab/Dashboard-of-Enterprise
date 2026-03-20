import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { store, persistor } from '../store';
import { darkTheme } from '@styles/theme/muiTheme';
import i18n from '@utils/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {children}
              </ThemeProvider>
            </BrowserRouter>
          </I18nextProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};
