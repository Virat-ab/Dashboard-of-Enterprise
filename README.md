# Enterprise Dashboard

A production-ready enterprise dashboard featuring real-time analytics, advanced state management with Redux Toolkit, TypeScript strict mode, and comprehensive testing.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment config (mock API enabled by default)
cp .env.example .env

# 3. Start dev server
npm run dev
```


## 🏗️ Project Structure

```
src/
├── app/
│   ├── store/              # Redux store, middleware
│   ├── hooks/              # useAppDispatch, useAppSelector
│   ├── providers/          # AppProvider (Redux, Router, Query, Theme)
│   └── router.tsx          # Route definitions + lazy loading
│
├── features/
│   ├── auth/               # Login, auth slice, route guards
│   ├── dashboard/          # Metrics, charts, activity feed
│   └── notifications/      # Notification panel & slice
│
├── components/
│   ├── atoms/              # Button, Input, Icon
│   ├── molecules/          # SearchBar, UserMenu
│   ├── organisms/          # Header, Sidebar, DataTable
│   └── templates/          # DashboardLayout, AuthLayout
│
├── hooks/                  # useWebSocket, useLocalStorage, useDebounce
├── services/               # Axios config, API modules, WebSocket service
├── utils/                  # Formatters, validators, constants, i18n, mock data
├── types/                  # TypeScript definitions
├── styles/                 # MUI theme, global CSS
└── pages/                  # Dashboard, Analytics, Settings
```

---

## ⚙️ Tech Stack

| Category | Technology |
|---|---|
| UI Framework | React 18 (Concurrent Features) |
| Language | TypeScript (strict mode) |
| State Management | Redux Toolkit + Redux Persist |
| Server State | TanStack React Query v5 |
| Routing | React Router v6 |
| UI Library | Material UI v5 |
| Charts | Recharts |
| Real-time | WebSocket (with mock mode) |
| Testing | Jest + React Testing Library |
| E2E | Cypress |
| Storybook | Storybook v8 |
| Build | Vite 5 |
| PWA | vite-plugin-pwa |
| i18n | i18next |
| Validation | Zod |


### Unit Tests
```bash
npm test                    # All tests with coverage
npm test -- --testPathPattern=authSlice   # Single test file
```

### E2E Tests
```bash
npm run dev                 # Start dev server first
npm run test:e2e            # Open Cypress
```

### Coverage Targets
| Layer | Target |
|---|---|
| Reducers | 100% |
| Utils / Formatters | 100% |
| Custom Hooks | 95% |
| Components | 90% |
| Integration | 85% |



## 📊 Features

### Real-time Dashboard
- Live metric card updates via WebSocket (simulated in mock mode)
- Toggleable real-time feed with visual status indicator
- Area charts for Revenue & User Growth with time-range selection (24H / 7D / 30D / 90D)
- Top Products table with sortable columns and progress bars
- Recent Activity feed with categorized event types

### Analytics Page
- Bar chart — product revenue breakdown
- Pie chart — revenue by category
- Radar chart — performance vs previous period
- Conversion funnel with animated progress bars

### State Management
- Feature-based Redux slices (auth, dashboard, notifications)
- Redux Persist for auth state (survives page reload)
- Custom API & logger middleware
- Optimistic UI patterns

### PWA Support
- Service worker with Workbox
- Offline-first caching strategy for API responses
- Web App Manifest for installability

