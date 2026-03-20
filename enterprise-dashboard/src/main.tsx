import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from '@app/providers/AppProvider';
import { AppRouter } from '@app/router';
import '@utils/i18n';

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  import('workbox-window').then(({ Workbox }) => {
    const wb = new Workbox('/sw.js');
    wb.register();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
);
