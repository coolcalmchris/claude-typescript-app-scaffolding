# TypeScript App Scaffolding

A production-ready, modern TypeScript application built with state-of-the-art libraries, best practices, and cutting-edge React patterns.

[![CI](https://github.com/yourusername/typescript-app-scaffolding/workflows/CI/badge.svg)](https://github.com/yourusername/typescript-app-scaffolding/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

### Core Technologies

- **React 19** - Latest React with concurrent features (Suspense, useTransition, useDeferredValue)
- **TypeScript 5.9** - Strict mode for maximum type safety
- **Vite 7** - Lightning-fast build tool with HMR
- **Tailwind CSS 4** - Utility-first CSS with automatic class sorting

### State Management

- **Zustand 5** - Lightweight state management
  - DevTools integration for debugging
  - Persist middleware for localStorage
  - Zero boilerplate

### Code Quality & Tooling

- **ESLint** - Enhanced with accessibility (a11y) and import ordering
- **Prettier** - With Tailwind CSS class sorting
- **Husky + lint-staged** - Git hooks for pre-commit validation
- **Commitlint** - Conventional commit messages
- **GitHub Actions** - Complete CI/CD pipeline

### Testing

- **Vitest** - Fast, Vite-native testing framework
- **React Testing Library** - User-centric component testing
- **Coverage Reports** - V8 coverage with threshold enforcement

### Performance Optimizations

- **Code Splitting** - Lazy loading with React.lazy and Suspense
- **Bundle Analysis** - rollup-plugin-visualizer for size tracking
- **Image Optimization** - Automatic compression and format conversion
- **Smart Chunking** - Feature-based and vendor code splitting

### Modern React Patterns

- **Error Boundaries** - Graceful error handling
- **Suspense Boundaries** - Loading states with skeleton loaders
- **useTransition** - Non-blocking UI updates
- **useDeferredValue** - Performance optimization for expensive renders
- **Lazy Loading** - Route and component-level code splitting

## Tech Stack

### Core

- React 19.2.0
- TypeScript 5.9 (strict mode)
- Vite 7.2

### Styling

- Tailwind CSS 4.1
- PostCSS
- Autoprefixer
- clsx + tailwind-merge for class management

### State Management

- Zustand 5.x with DevTools and Persist middleware

### Testing

- Vitest
- React Testing Library
- @testing-library/user-event
- jsdom
- V8 coverage

### Code Quality

- ESLint with TypeScript, React, a11y, and import plugins
- Prettier with Tailwind plugin
- Husky for git hooks
- lint-staged for pre-commit checks
- Commitlint for conventional commits

### Build & Bundle

- Rollup (via Vite)
- rollup-plugin-visualizer (bundle analysis)
- vite-plugin-image-optimizer
- Feature-based code splitting

## Project Structure

```
src/
├── assets/           # Static assets (images, styles)
│   └── styles/       # Global CSS and Tailwind
├── components/
│   ├── ui/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/      # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── ErrorBoundary.tsx
├── features/        # Feature-based modules
│   ├── counter/     # State management example
│   ├── dashboard/   # useTransition example
│   └── search/      # useDeferredValue example
├── hooks/           # Custom React hooks
│   └── useDebounce.ts
├── stores/          # Zustand stores
│   └── counterStore.ts
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
│   └── cn.ts        # Class name utility
├── __tests__/       # Test setup
├── App.tsx          # Root component with Error Boundary & Suspense
├── main.tsx         # Entry point
└── vite-env.d.ts    # Environment types
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/typescript-app-scaffolding.git
cd typescript-app-scaffolding

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

All environment variables must be prefixed with `VITE_` to be exposed to the client.

## Available Scripts

### Development

- `npm run dev` - Start development server on port 3000
- `npm run preview` - Preview production build locally

### Build

- `npm run build` - Build for production (type-check + bundle)
- `npm run build:analyze` - Build with bundle analysis

### Testing

- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate coverage report
- `npm run test:run` - Run tests once (CI mode)

### Code Quality

- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Check TypeScript types

### Validation

- `npm run validate` - Run all checks (type-check + lint + format + test)

## Code Quality

### TypeScript Configuration

Strict TypeScript settings for maximum type safety:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "noImplicitReturns": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "exactOptionalPropertyTypes": true
}
```

### ESLint Configuration

Enhanced rules for code quality:

- **TypeScript**: Type-checked linting with strict rules
- **React**: Hooks rules and best practices
- **Accessibility**: jsx-a11y for WCAG compliance
- **Imports**: Automatic import ordering and organization
- **Prettier**: Integration for consistent formatting

### Git Hooks

Pre-commit hooks ensure code quality:

1. **lint-staged**: Auto-format and lint staged files
2. **type-check**: Verify TypeScript compilation
3. **commit-msg**: Validate commit message format

### Conventional Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(counter): add reset button
fix(button): correct hover state
docs(readme): update installation steps
```

## CI/CD Pipeline

GitHub Actions workflow runs on every push/PR:

1. **Code Quality** - ESLint, Prettier, TypeScript
2. **Tests** - Unit tests with coverage
3. **Build** - Production build verification
4. **Validation** - Full validation check

Runs on Node 18.x and 20.x for compatibility.

## Performance

### Code Splitting

- Lazy-loaded components with `React.lazy()`
- Suspense boundaries with loading states
- Feature-based chunk splitting
- Vendor code separation

### Bundle Optimization

- Tree shaking for dead code elimination
- Manual chunks for optimal caching
- Source maps for debugging
- CSS code splitting

### Build Analysis

Generate bundle analysis:

```bash
npm run build:analyze
```

Opens `dist/stats.html` with interactive bundle visualization.

### React Concurrent Features

- **Error Boundaries**: Catch and handle errors gracefully
- **Suspense**: Loading states for async components
- **useTransition**: Non-blocking state updates
- **useDeferredValue**: Defer expensive re-renders

## Component Patterns

### Barrel Exports

Clean imports via index files:

```typescript
// Instead of
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Use
import { Button, Card } from '@/components/ui'
```

### Path Aliases

TypeScript path aliases for imports:

```typescript
import { Button } from '@/components/ui'
import { useCounterStore } from '@/stores'
import { cn } from '@/utils'
```

### Class Name Utility

`cn()` utility combines `clsx` and `tailwind-merge`:

```typescript
<div className={cn(
  'base-class',
  condition && 'conditional-class',
  'px-4' // Properly merged with Tailwind classes
)} />
```

## State Management

Zustand provides simple, scalable state:

```typescript
// Define store
export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      { name: 'storage-key' }
    )
  )
)

// Use in components
const { count, increment } = useStore()
```

## Testing

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component', () => {
  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<Component />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('Result')).toBeInTheDocument()
  })
})
```

### Coverage

View coverage report:

```bash
npm run test:coverage
open coverage/index.html
```

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture documentation

## Best Practices

1. **Type Safety**: Always use explicit types, avoid `any`
2. **Component Design**: Single responsibility, composition over inheritance
3. **State Management**: Keep state as local as possible
4. **Performance**: Lazy load heavy components, optimize re-renders
5. **Testing**: Write tests for critical functionality
6. **Accessibility**: Follow WCAG guidelines, use semantic HTML
7. **Git Workflow**: Feature branches, conventional commits, PR reviews

## Browser Support

Supports all modern browsers with ES2020:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Deployment

### Build

```bash
npm run build
```

Output is in `dist/` directory.

### Environment Variables

Set environment variables in your deployment platform:

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Other: Refer to platform documentation

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

## License

MIT © [Your Name]

## Acknowledgments

Built with modern tools and best practices:

- React Team for concurrent features
- Vite Team for blazing-fast tooling
- Tailwind Labs for utility-first CSS
- Zustand for simple state management
- And the entire open source community
