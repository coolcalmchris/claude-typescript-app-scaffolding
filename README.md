# TypeScript App Scaffolding

A modern, scalable TypeScript application built with state-of-the-art libraries and best practices.

## Features

- **React 19** - Latest version of React with modern patterns
- **TypeScript** - Strict type checking for robust code
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management with persistence
- **Vitest** - Fast unit testing framework
- **ESLint & Prettier** - Code quality and formatting
- **Path Aliases** - Clean imports with @ prefix

## Tech Stack

### Core
- React 19.2.0
- TypeScript (strict mode)
- Vite

### Styling
- Tailwind CSS 3.x
- PostCSS
- Autoprefixer

### State Management
- Zustand 5.x with DevTools and Persist middleware

### Testing
- Vitest
- React Testing Library
- @testing-library/user-event
- Coverage with V8

### Code Quality
- ESLint with TypeScript support
- Prettier
- Type-checked linting rules

## Project Structure

```
src/
├── assets/           # Static assets (images, styles)
│   └── styles/       # Global CSS and Tailwind
├── components/       # Reusable components
│   ├── ui/          # Basic UI components (Button, Card, etc.)
│   └── layout/      # Layout components (Header, Footer, etc.)
├── features/        # Feature-based modules
│   └── counter/     # Example feature
├── hooks/           # Custom React hooks
├── stores/          # Zustand stores
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── __tests__/       # Test setup and utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Code Quality

### TypeScript Configuration

This project uses strict TypeScript configuration with:
- `strict: true` - All strict type checking options enabled
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused parameters
- `noFallthroughCasesInSwitch: true` - Error on switch fallthrough
- `noImplicitReturns: true` - Error on missing return statements
- And more strict checks for production-ready code

### ESLint

Configured with:
- TypeScript ESLint with type-checked rules
- React Hooks rules
- React Refresh for HMR
- Prettier integration

### Path Aliases

Clean imports using path aliases:

```typescript
import { Button } from '@/components/ui'
import { useCounterStore } from '@/stores'
import { cn } from '@/utils'
```

## State Management

Using Zustand for simple, scalable state management:

```typescript
import { useCounterStore } from '@/stores'

function Component() {
  const { count, increment, decrement } = useCounterStore()
  // ...
}
```

Features:
- DevTools integration for debugging
- State persistence with localStorage
- No boilerplate, simple API
- TypeScript support out of the box

## Component Patterns

### Barrel Exports

Each module uses barrel exports for clean imports:

```typescript
// Instead of
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// Use
import { Button, Card } from '@/components/ui'
```

### Type-safe Props

All components use TypeScript interfaces for props:

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}
```

## Testing

Run tests with Vitest:

```bash
# Watch mode
npm test

# UI mode
npm run test:ui

# Coverage
npm run test:coverage
```

Example test:

```typescript
it('increments the counter', async () => {
  const user = userEvent.setup()
  render(<Counter />)

  await user.click(screen.getByRole('button', { name: /increment/i }))

  expect(screen.getByText('1')).toBeInTheDocument()
})
```

## Extending the Application

### Adding a New Feature

1. Create a feature directory: `src/features/my-feature/`
2. Add components, types, and logic
3. Create an index.ts for barrel exports
4. Add tests: `MyFeature.test.tsx`

### Adding a New Component

1. Create component in `src/components/ui/` or `src/components/layout/`
2. Use TypeScript for props
3. Apply Tailwind classes
4. Export from index.ts

### Adding a New Store

1. Create store in `src/stores/`
2. Use Zustand's create function
3. Add TypeScript types
4. Export from index.ts

## Best Practices

1. **Always use TypeScript types** - Never use `any`
2. **Component composition** - Build complex UIs from simple components
3. **Barrel exports** - Keep imports clean
4. **Test coverage** - Write tests for critical features
5. **Path aliases** - Use @ prefix for imports
6. **Strict mode** - Keep TypeScript strict settings enabled
7. **Code formatting** - Run Prettier before commits

## Performance Optimizations

- Code splitting with Vite
- Manual chunks for vendor libraries
- Source maps for debugging
- Tree shaking for smaller bundles
- React Strict Mode for catching issues

## Browser Support

Supports all modern browsers that support ES2020:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Run linting and type checking before commits
4. Keep commits focused and descriptive
