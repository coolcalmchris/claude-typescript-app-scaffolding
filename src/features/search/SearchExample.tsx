import { useDeferredValue, useState, useMemo } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

/**
 * Example component demonstrating useDeferredValue
 * Shows how to defer non-urgent updates for better performance
 */
export function SearchExample() {
  const [searchTerm, setSearchTerm] = useState('')
  const deferredSearchTerm = useDeferredValue(searchTerm)

  // Simulate expensive computation
  const items = useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      description: `Description for item ${i}`,
    }))
  }, [])

  const filteredItems = useMemo(() => {
    if (!deferredSearchTerm) return items.slice(0, 100)

    return items
      .filter(
        (item) =>
          item.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(deferredSearchTerm.toLowerCase())
      )
      .slice(0, 100)
  }, [deferredSearchTerm, items])

  const isPending = searchTerm !== deferredSearchTerm

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search with useDeferredValue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search items (10,000 total)
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-sm text-gray-600">
            {isPending ? (
              <span className="text-yellow-600">Updating results...</span>
            ) : (
              <span>
                Found {filteredItems.length} items
                {filteredItems.length === 100 && ' (showing first 100)'}
              </span>
            )}
          </div>

          <div
            className="max-h-96 space-y-2 overflow-y-auto"
            style={{ opacity: isPending ? 0.5 : 1 }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded border border-gray-200 bg-gray-50 p-3"
              >
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>

          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <strong>Note:</strong> This example uses{' '}
            <code>useDeferredValue</code> to defer the search filtering, keeping
            the input responsive while the expensive filter operation happens in
            the background.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
