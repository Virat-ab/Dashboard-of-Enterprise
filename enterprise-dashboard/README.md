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

Open **http://localhost:5173** and sign in with:
- **Email:** `admin@enterprise.com`
- **Password:** `password`

---

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

---

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Type-check + production build
npm run preview      # Preview production build locally
npm test             # Run unit tests with coverage
npm run test:watch   # Watch mode
npm run test:e2e     # Open Cypress interactive runner
npm run test:e2e:headless  # Run Cypress headlessly
npm run storybook    # Start Storybook dev server
npm run build-storybook    # Build static Storybook
npm run type-check   # TypeScript type checking
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier formatting
```

---

## 🔧 Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | REST API base URL | `https://api.enterprise-demo.com/v1` |
| `VITE_WS_URL` | WebSocket URL | `wss://ws.enterprise-demo.com` |
| `VITE_APP_TITLE` | App display title | `Enterprise Dashboard` |
| `VITE_ENABLE_MOCK` | Use mock data (no real API needed) | `true` |

---

## 🧪 Testing

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

---

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

---

## 🚢 Deployment

### Vercel (recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set secrets in Vercel dashboard:
- `VITE_ENABLE_MOCK=true` (for demo) or point to your real API

### GitHub Actions CI/CD
The included workflow (`.github/workflows/ci-cd.yml`) runs:
1. **Lint & Type Check** on every push/PR
2. **Unit Tests** with coverage upload to Codecov
3. **Build** — produces optimized bundle
4. **E2E Tests** with Cypress
5. **Deploy to Vercel** on merge to `main`

Required repository secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `CODECOV_TOKEN` (optional)

---

## 📖 Storybook

Component documentation with live controls:

```bash
npm run storybook
# Opens at http://localhost:6006
```

Stories available for:
- `Dashboard/MetricCard` — all variants + loading state

---

## 🔒 Authentication

Mock credentials for local development:

| Email | Password | Role |
|---|---|---|
| admin@enterprise.com | password | Admin |

For production, replace `authService.ts` with your real auth endpoint and remove mock mode.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT © Enterprise Dashboard
