import type { Metric } from 'web-vitals'

/**
 * Web Vitals monitoring utility
 * Tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB, INP
 */

type ReportHandler = (metric: Metric) => void

const reportMetric: ReportHandler = (metric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric)
  }

  // Send to analytics in production
  if (import.meta.env.PROD) {
    // Example: Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      })
    }

    // Example: Send to custom analytics endpoint
    const analyticsEndpoint = import.meta.env['VITE_ANALYTICS_ENDPOINT']
    if (analyticsEndpoint) {
      fetch(analyticsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          navigationType: metric.navigationType,
          timestamp: Date.now(),
          url: window.location.href,
        }),
        keepalive: true,
      }).catch(console.error)
    }
  }
}

/**
 * Initialize Web Vitals reporting
 * Call this once when your app starts
 */
export async function initWebVitals() {
  if (typeof window === 'undefined') return

  try {
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

    // Core Web Vitals
    onCLS(reportMetric) // Cumulative Layout Shift
    onLCP(reportMetric) // Largest Contentful Paint
    onINP(reportMetric) // Interaction to Next Paint (replaces FID)

    // Additional metrics
    onFCP(reportMetric) // First Contentful Paint
    onTTFB(reportMetric) // Time to First Byte
  } catch (error) {
    console.error('Failed to initialize Web Vitals:', error)
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) return null

  const navigation = performance.getEntriesByType('navigation')[0]!

  return {
    // Navigation timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,
    loadComplete: navigation.loadEventEnd - navigation.fetchStart,

    // Resource timing
    resources: performance.getEntriesByType('resource').length,

    // Memory (if available)
    memory: (performance as any).memory
      ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
        }
      : null,
  }
}

/**
 * Log performance summary to console
 */
export function logPerformanceSummary() {
  const metrics = getPerformanceMetrics()
  if (!metrics) return

  console.group('🚀 Performance Metrics')
  console.log('⏱️  TTFB:', `${metrics.ttfb.toFixed(2)}ms`)
  console.log('⏱️  DOM Interactive:', `${metrics.domInteractive.toFixed(2)}ms`)
  console.log('⏱️  DOM Complete:', `${metrics.domComplete.toFixed(2)}ms`)
  console.log('⏱️  Load Complete:', `${metrics.loadComplete.toFixed(2)}ms`)
  console.log('📦 Resources Loaded:', metrics.resources)
  if (metrics.memory) {
    console.log(
      '💾 JS Heap Used:',
      `${(metrics.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`
    )
  }
  console.groupEnd()
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
