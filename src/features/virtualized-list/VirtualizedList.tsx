import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

/**
 * Virtualized list example demonstrating performance optimization
 * for rendering large lists (only renders visible items)
 */
export function VirtualizedList() {
  const parentRef = useRef<HTMLDivElement>(null)

  // Generate large dataset
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `Item #${i + 1}`,
    description: `This is the description for item ${i + 1}`,
    category: ['Technology', 'Design', 'Marketing', 'Sales'][i % 4],
    date: new Date(2024, 0, (i % 365) + 1).toLocaleDateString(),
  }))

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5, // Render 5 extra items outside viewport
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtualized List (10,000 Items)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <strong>Performance:</strong> This list contains 10,000 items but
            only renders ~20 at a time. Try scrolling - it's blazing fast!
          </div>

          <div
            ref={parentRef}
            className="h-[500px] overflow-auto rounded border border-gray-200"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = items[virtualItem.index]
                if (!item) return null

                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <div className="mx-2 my-1 flex items-center justify-between rounded border border-gray-200 bg-white p-3 hover:bg-gray-50">
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-blue-600">
                          {item.category}
                        </div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing items {virtualizer.getVirtualItems()[0]?.index ?? 0} -{' '}
            {virtualizer.getVirtualItems()[
              virtualizer.getVirtualItems().length - 1
            ]?.index ?? 0}{' '}
            of {items.length.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
