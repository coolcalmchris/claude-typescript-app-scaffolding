import { useEffect } from 'react'

import { initWebVitals, logPerformanceSummary } from '@/utils/webVitals'

/**
 * Performance monitoring component
 * Automatically initializes Web Vitals tracking
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize Web Vitals
    void initWebVitals()

    // Log performance summary after page load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Wait a bit for all resources to finish
        setTimeout(() => {
          if (import.meta.env.DEV) {
            logPerformanceSummary()
          }
        }, 1000)
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}
