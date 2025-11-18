# Architecture Documentation

This document provides an overview of the application architecture, design decisions, and patterns used.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [State Management](#state-management)
- [Performance Optimizations](#performance-optimizations)
- [Code Quality](#code-quality)

## Technology Stack

### Core

- **React 19** - UI library with latest concurrent features
- **TypeScript 5.9** - Type-safe JavaScript with strict settings
- **Vite 7** - Fast build tool and dev server

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS transformation
- **Autoprefixer** - Vendor prefix automation

### State Management

- **Zustand 5** - Lightweight state management
  - DevTools integration for debugging
  - Persist middleware for localStorage
  - Simple, boilerplate-free API

### Testing

- **Vitest** - Fast unit testing framework
- **React Testing Library** - User-centric testing
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js

### Code Quality

- **ESLint** - Linting with TypeScript support
  - Accessibility rules (jsx-a11y)
  - Import ordering (eslint-plugin-import)
  - React-specific rules
- **Prettier** - Code formatting
  - Tailwind class sorting plugin
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **Commitlint** - Commit message validation

### Build & Bundling

- **Rollup** (via Vite) - Module bundler
- **rollup-plugin-visualizer** - Bundle size analysis
- **vite-plugin-image-optimizer** - Image optimization

## Project Structure

```
typescript-app-scaffolding/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── .husky/                     # Git hooks
│   ├── pre-commit
│   └── commit-msg
├── .vscode/
│   ├── extensions.json         # Recommended extensions
│   └── settings.json           # Editor settings
├── public/                     # Static assets
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── index.css       # Global styles & Tailwind
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── index.ts
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── index.ts
│   │   └── ErrorBoundary.tsx   # Error handling
│   ├── features/               # Feature modules
│   │   ├── counter/
│   │   │   ├── Counter.tsx
│   │   │   ├── Counter.test.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/          # useTransition example
│   │   └── search/             # useDeferredValue example
│   ├── hooks/                  # Custom React hooks
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── stores/                 # Zustand stores
│   │   ├── counterStore.ts
│   │   └── index.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── cn.ts               # Class name utility
│   │   └── index.ts
│   ├── __tests__/              # Test utilities
│   │   └── setup.ts
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Vite types
├── .env.example                # Environment variables template
├── .eslintrc.cjs               # ESLint configuration
├── .gitignore
├── .lintstagedrc.json          # lint-staged configuration
├── .prettierrc                 # Prettier configuration
├── .prettierignore
├── commitlint.config.js        # Commitlint configuration
├── index.html                  # HTML template
├── package.json
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # TypeScript config for Node
├── vite.config.ts              # Vite configuration
└── vitest.config.ts            # Vitest configuration
```

## Design Patterns

### Feature-Based Organization

Each feature is self-contained with its components, tests, and logic:

```
features/
└── counter/
    ├── Counter.tsx         # Component
    ├── Counter.test.tsx    # Tests
    └── index.ts            # Barrel export
```

Benefits:

- Easy to locate related code
- Simple to delete/move features
- Clear ownership and boundaries

### Barrel Exports

Each module uses barrel exports (`index.ts`) for clean imports:

```typescript
// Instead of
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Use
import { Button, Card } from '@/components/ui'
```

### Component Composition

Build complex UIs from simple, reusable components:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Path Aliases

Clean imports using TypeScript path aliases:

```typescript
import { Button } from '@/components/ui'
import { useCounterStore } from '@/stores'
import { cn } from '@/utils'
```

## State Management

### Zustand Architecture

Simple, hook-based state management:

```typescript
// Define store
export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      { name: 'counter-storage' }
    )
  )
)

// Use in components
const { count, increment } = useCounterStore()
```

Benefits:

- No boilerplate
- TypeScript support
- DevTools integration
- Easy persistence

## Performance Optimizations

### Code Splitting

- **Lazy Loading**: Heavy components loaded on-demand
- **Suspense Boundaries**: Graceful loading states
- **Route-based splitting**: Ready for React Router

```typescript
const Dashboard = lazy(() => import('@/features/dashboard'))

<Suspense fallback={<CardSkeleton />}>
  <Dashboard />
</Suspense>
```

### Build Optimizations

- **Manual Chunks**: Vendor code separated
- **Feature Splitting**: Each feature in its own chunk
- **Tree Shaking**: Dead code elimination
- **Minification**: esbuild for fast builds

```typescript
manualChunks: (id) => {
  if (id.includes('node_modules')) {
    if (id.includes('react')) return 'react'
    return 'vendor'
  }
  if (id.includes('/features/')) {
    return `feature-${match[1]}`
  }
}
```

### React Concurrent Features

- **useTransition**: Non-blocking state updates
- **useDeferredValue**: Deferred rendering
- **Suspense**: Loading states
- **Error Boundaries**: Graceful error handling

### Image Optimization

- Automatic image compression
- WebP/AVIF support
- Quality optimization

## Code Quality

### TypeScript Configuration

Strict mode enabled for maximum type safety:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "noImplicitReturns": true,
  "noUncheckedIndexedAccess": true
}
```

### ESLint Rules

- TypeScript-specific rules
- React best practices
- Accessibility checks (a11y)
- Import ordering
- Consistent code style

### Testing Strategy

- **Unit Tests**: Component behavior
- **Integration Tests**: Feature workflows
- **Coverage**: Minimum 80% recommended
- **User-centric**: Test user interactions, not implementation

### Git Workflow

1. **Feature branch**: Create from main
2. **Conventional commits**: Semantic commit messages
3. **Pre-commit hooks**: Auto-format and lint
4. **PR checks**: CI runs all validations
5. **Code review**: Required before merge

## CI/CD Pipeline

GitHub Actions workflow:

1. **Quality Check**: Lint, format, type-check
2. **Tests**: Run unit tests with coverage
3. **Build**: Verify production build
4. **Validate**: Full validation check

Runs on:

- Push to main/develop
- Pull requests
- Multiple Node versions (18.x, 20.x)

## Best Practices

### Component Design

- Single Responsibility Principle
- Props with TypeScript interfaces
- Default props using destructuring
- Explicit return types

### State Management

- Keep state as local as possible
- Use Zustand for global state
- Avoid prop drilling
- Immutable updates

### Performance

- Lazy load heavy components
- Use React.memo strategically
- Avoid inline functions in JSX (when needed)
- Optimize re-renders

### Security

- No secrets in code
- Environment variables for config
- Input validation
- XSS protection (React defaults)

## Future Enhancements

Potential additions:

- **React Router**: Client-side routing
- **React Query**: Server state management
- **MSW**: API mocking for tests
- **Storybook**: Component documentation
- **Playwright**: E2E testing
- **Server Components**: When adopting Next.js/Remix

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Vitest](https://vitest.dev)
