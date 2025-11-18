import { useState, useTransition } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'

/**
 * Example component demonstrating useTransition
 * Shows how to mark updates as non-urgent transitions
 */
export function Dashboard() {
  const [tab, setTab] = useState<'overview' | 'analytics' | 'reports'>(
    'overview'
  )
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (newTab: typeof tab) => {
    startTransition(() => {
      setTab(newTab)
    })
  }

  // Simulate expensive render
  const renderContent = () => {
    const items = Array.from({ length: 500 }, (_, i) => i)

    switch (tab) {
      case 'overview':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Overview</h3>
            <p className="text-gray-600">
              Welcome to your dashboard. Here's a quick overview of your data.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {items.slice(0, 6).map((i) => (
                <div key={i} className="rounded bg-blue-50 p-4">
                  <div className="text-2xl font-bold text-blue-600">{i}</div>
                  <div className="text-sm text-gray-600">Metric {i}</div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Analytics</h3>
            <p className="text-gray-600">Detailed analytics and insights.</p>
            <div className="grid grid-cols-2 gap-4">
              {items.slice(0, 10).map((i) => (
                <div key={i} className="rounded border border-gray-200 p-3">
                  <div className="text-lg font-medium text-gray-900">
                    Chart {i}
                  </div>
                  <div className="mt-2 h-24 rounded bg-gray-100"></div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Reports</h3>
            <p className="text-gray-600">Generated reports and downloads.</p>
            <div className="space-y-2">
              {items.slice(0, 20).map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded border border-gray-200 p-3"
                >
                  <div>
                    <div className="font-medium text-gray-900">Report {i}</div>
                    <div className="text-sm text-gray-600">
                      Generated on {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard with useTransition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => handleTabChange('overview')}
              className={`px-4 py-2 font-medium transition-colors ${
                tab === 'overview'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange('analytics')}
              className={`px-4 py-2 font-medium transition-colors ${
                tab === 'analytics'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => handleTabChange('reports')}
              className={`px-4 py-2 font-medium transition-colors ${
                tab === 'reports'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reports
            </button>
          </div>

          {isPending && (
            <div className="text-sm text-yellow-600">Loading content...</div>
          )}

          <div style={{ opacity: isPending ? 0.7 : 1 }}>{renderContent()}</div>

          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <strong>Note:</strong> This example uses <code>useTransition</code>{' '}
            to mark tab changes as non-urgent, keeping the UI responsive while
            rendering heavy content.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
