import { useCounterStore } from '@/stores'
import { Button } from '@/components/ui'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

/**
 * Counter feature component demonstrating Zustand state management
 * and component composition
 */
export function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium text-gray-600">
              Current Count
            </p>
            <p className="text-5xl font-bold text-blue-600">{count}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={decrement} variant="secondary" size="md">
              Decrement
            </Button>
            <Button onClick={increment} variant="primary" size="md">
              Increment
            </Button>
            <Button onClick={reset} variant="outline" size="md">
              Reset
            </Button>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              This counter demonstrates:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>Zustand state management with persistence</li>
              <li>Reusable UI components (Button, Card)</li>
              <li>TypeScript type safety</li>
              <li>Tailwind CSS styling</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
