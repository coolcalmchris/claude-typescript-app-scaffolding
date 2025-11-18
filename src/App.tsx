import { Suspense, lazy } from 'react'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/layout/Layout'
import { CardSkeleton } from '@/components/ui/LoadingSpinner'
import { Counter } from '@/features/counter/Counter'

// Lazy load heavy components for better initial load performance
const Dashboard = lazy(() =>
  import('@/features/dashboard').then((module) => ({
    default: module.Dashboard,
  }))
)

const SearchExample = lazy(() =>
  import('@/features/search').then((module) => ({
    default: module.SearchExample,
  }))
)

const VirtualizedList = lazy(() =>
  import('@/features/virtualized-list').then((module) => ({
    default: module.VirtualizedList,
  }))
)

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <div className="container py-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              TypeScript App Scaffolding
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              A modern, scalable TypeScript application with state-of-the-art
              tooling and best practices.
            </p>

            <div className="space-y-8">
              {/* Static component - loads immediately */}
              <Counter />

              {/* Lazy-loaded components with Suspense boundaries */}
              <Suspense fallback={<CardSkeleton />}>
                <Dashboard />
              </Suspense>

              <Suspense fallback={<CardSkeleton />}>
                <SearchExample />
              </Suspense>

              <Suspense fallback={<CardSkeleton />}>
                <VirtualizedList />
              </Suspense>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">
                  Modern React Patterns Demonstrated
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>✓ Error Boundaries for graceful error handling</li>
                  <li>✓ Suspense for code splitting and lazy loading</li>
                  <li>✓ useTransition for non-blocking updates</li>
                  <li>✓ useDeferredValue for performance optimization</li>
                  <li>✓ Virtual scrolling for large lists</li>
                  <li>✓ Skeleton loaders for better UX</li>
                  <li>✓ Web Vitals monitoring</li>
                  <li>✓ PWA with offline support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
