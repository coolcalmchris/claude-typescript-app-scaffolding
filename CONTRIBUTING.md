# Contributing to TypeScript App Scaffolding

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/typescript-app-scaffolding.git
   cd typescript-app-scaffolding
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Code Quality

Before committing, ensure your code passes all quality checks:

```bash
# Run all validations
npm run validate

# Or run individually:
npm run type-check  # TypeScript type checking
npm run lint        # ESLint
npm run format      # Prettier formatting
npm test            # Unit tests
```

### Git Hooks

This project uses Husky for git hooks:

- **pre-commit**: Runs lint-staged (auto-formats and lints staged files) and type checking
- **commit-msg**: Validates commit messages follow conventional commits

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, etc.)

**Examples:**

```bash
feat(counter): add reset functionality
fix(button): correct hover state styling
docs(readme): update installation instructions
```

## Code Style

### TypeScript

- Use strict TypeScript settings
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and primitives
- Always define explicit return types for functions
- Use type imports: `import type { User } from './types'`

### React

- Use functional components with hooks
- Prefer named exports over default exports (except for pages)
- Use TypeScript interfaces for props
- Destructure props in function parameters
- Use `const` for all declarations

### Styling

- Use Tailwind CSS utility classes
- Use the `cn()` utility for conditional classes
- Follow mobile-first responsive design
- Group related Tailwind classes (layout, spacing, colors, etc.)

### File Organization

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Basic UI elements
│   └── layout/    # Layout components
├── features/      # Feature modules
│   └── feature-name/
│       ├── Component.tsx
│       ├── Component.test.tsx
│       └── index.ts
├── hooks/         # Custom React hooks
├── stores/        # Zustand stores
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useDebounce.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types/Interfaces**: PascalCase (`UserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)

## Testing

### Writing Tests

- Write tests for all new features
- Use descriptive test names
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component', () => {
  it('should do something when action occurs', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<Component />)

    // Act
    await user.click(screen.getByRole('button'))

    // Assert
    expect(screen.getByText('Result')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
npm test           # Watch mode
npm run test:ui    # UI mode
npm run test:coverage  # Coverage report
npm run test:run   # Single run
```

## Pull Request Process

1. **Update your fork**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure all checks pass**:

   ```bash
   npm run validate
   ```

3. **Create a pull request**:
   - Provide a clear description of changes
   - Reference related issues
   - Include screenshots for UI changes
   - Ensure CI passes

4. **Code review**:
   - Address reviewer feedback
   - Keep commits clean and organized
   - Squash commits if requested

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
