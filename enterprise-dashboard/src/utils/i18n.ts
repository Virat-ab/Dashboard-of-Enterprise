import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome back, {{name}}',
        lastUpdated: 'Last updated {{time}}',
        realtime: 'Real-time',
        export: 'Export',
        refresh: 'Refresh',
        timeRange: {
          '24h': 'Last 24 Hours',
          '7d': 'Last 7 Days',
          '30d': 'Last 30 Days',
          '90d': 'Last 90 Days',
        },
      },
      metrics: {
        revenue: 'Total Revenue',
        users: 'Active Users',
        orders: 'Total Orders',
        conversion: 'Conversion Rate',
        change: '{{percent}}% vs last period',
      },
      nav: {
        dashboard: 'Dashboard',
        analytics: 'Analytics',
        settings: 'Settings',
        users: 'Users',
        reports: 'Reports',
      },
      auth: {
        login: 'Sign In',
        logout: 'Sign Out',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        loginTitle: 'Welcome back',
        loginSubtitle: 'Sign in to your enterprise account',
        demoCredentials: 'Demo: admin@enterprise.com / password',
      },
      notifications: {
        title: 'Notifications',
        markAllRead: 'Mark all as read',
        empty: 'No notifications',
        noUnread: 'You\'re all caught up!',
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Retry',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        search: 'Search...',
        filter: 'Filter',
        export: 'Export',
        noData: 'No data available',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
