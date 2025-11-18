# Performance Optimization Guide

This document outlines all the performance optimizations implemented in this application and how to monitor and improve performance metrics.

## Table of Contents

- [Overview](#overview)
- [Implemented Optimizations](#implemented-optimizations)
- [Core Web Vitals](#core-web-vitals)
- [Monitoring Performance](#monitoring-performance)
- [Lighthouse Audits](#lighthouse-audits)
- [Best Practices](#best-practices)

## Overview

This application is optimized for maximum performance with a focus on Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s

## Implemented Optimizations

### 1. Image Optimization

#### Responsive Images

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage'

;<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  blurDataURL={generateBlurPlaceholder(800, 600)}
  priority={false} // true for above-the-fold images
/>
```

**Features:**

- Automatic srcset generation for different screen sizes
- Lazy loading (native `loading="lazy"`)
- Low-quality image placeholders (LQIP)
- Blur-up effect during loading
- Automatic WebP/AVIF conversion (via Vite plugin)

### 2. Code Splitting

#### Lazy Loading Components

```tsx
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('@/features/dashboard'))

<Suspense fallback={<LoadingSkeleton />}>
  <Dashboard />
</Suspense>
```

**Benefits:**

- Reduced initial bundle size
- Faster First Contentful Paint
- Better TTI scores
- Automatic chunk splitting per feature

### 3. Virtual Scrolling

For large lists (>100 items), use virtual scrolling:

```tsx
import { VirtualizedList } from '@/features/virtualized-list'

;<VirtualizedList />
```

**Performance gains:**

- Renders only visible items
- Constant memory usage regardless of list size
- Smooth 60fps scrolling
- Handles 10,000+ items effortlessly

### 4. Service Worker & PWA

#### Offline Support

- Automatic caching of static assets
- Font and image caching strategies
- Background sync capabilities
- Installable as native app

#### Cache Strategies:

- **Fonts**: CacheFirst (1 year expiration)
- **Images**: CacheFirst (30 days expiration)
- **API calls**: NetworkFirst (configure as needed)

### 5. Asset Optimization

#### Compression

- **Brotli compression** (.br files)
- **Gzip compression** (.gz files)
- Automatic in production builds

#### Bundle Optimization

- Tree shaking for dead code elimination
- Manual vendor chunk splitting
- Feature-based code splitting
- CSS code splitting

### 6. Resource Hints

In `index.html`:

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://api.example.com" />

<!-- Preload critical resources -->
<link
  rel="preload"
  as="font"
  href="/fonts/custom-font.woff2"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" as="image" href="/hero-image.webp" type="image/webp" />
```

**Types:**

- `preconnect`: Early connection establishment (DNS, TCP, TLS)
- `dns-prefetch`: DNS resolution only
- `preload`: High-priority resource loading
- `prefetch`: Low-priority future navigation resources

### 7. Web Vitals Monitoring

Automatic tracking of Core Web Vitals:

```typescript
import { initWebVitals } from '@/utils/webVitals'

// Automatically called in main.tsx
initWebVitals()
```

**Tracked Metrics:**

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)
- INP (Interaction to Next Paint)

## Core Web Vitals

### Largest Contentful Paint (LCP)

**Target**: < 2.5s

**Optimizations:**

1. Use `priority={true}` for above-the-fold images
2. Preload hero images: `<link rel="preload" as="image" />`
3. Optimize image sizes and formats
4. Use CDN for static assets
5. Minimize render-blocking resources

### First Input Delay (FID) / Interaction to Next Paint (INP)

**Target**: < 100ms (FID), < 200ms (INP)

**Optimizations:**

1. Use `useTransition` for non-urgent updates
2. Debounce expensive operations
3. Use web workers for heavy computation
4. Minimize JavaScript execution time
5. Use virtualization for large lists

### Cumulative Layout Shift (CLS)

**Target**: < 0.1

**Optimizations:**

1. Always specify width/height for images
2. Use aspect-ratio for responsive images
3. Reserve space for dynamic content
4. Avoid inserting content above existing content
5. Use CSS containment

## Monitoring Performance

### Development

#### Web Vitals Console Logging

Metrics are automatically logged in development:

```
[Web Vitals] LCP: 1234ms
[Web Vitals] FID: 45ms
[Web Vitals] CLS: 0.05
```

#### Performance Summary

```typescript
import { logPerformanceSummary } from '@/utils/webVitals'

// Call after page load
logPerformanceSummary()
```

### Production

#### Google Analytics Integration

```typescript
// Automatically sends to GA4 if gtag is available
window.gtag('event', 'LCP', {
  value: 1234,
  metric_id: 'unique-id',
})
```

#### Custom Analytics Endpoint

Set environment variable:

```bash
VITE_ANALYTICS_ENDPOINT=https://api.example.com/vitals
```

## Lighthouse Audits

### Running Lighthouse

#### Local Audit

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Build the app
npm run build

# Run Lighthouse
npm run preview & lhci autorun
```

#### CI/CD Integration

Lighthouse runs automatically on every PR via GitHub Actions:

```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  run: |
    npm run build
    npm run lhci
```

### Performance Budget

Defined in `.lighthouserc.json`:

- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90
- PWA: ≥ 80

## Best Practices

### 1. Images

✅ **DO:**

- Use `OptimizedImage` component
- Specify width and height
- Use WebP/AVIF with fallbacks
- Lazy load below-the-fold images
- Use blur placeholders

❌ **DON'T:**

- Use raw `<img>` tags without optimization
- Load all images eagerly
- Use oversized images
- Skip alt text

### 2. JavaScript

✅ **DO:**

- Code split by route and feature
- Use `React.lazy()` for heavy components
- Implement virtual scrolling for long lists
- Use `useTransition` and `useDeferredValue`
- Minimize third-party scripts

❌ **DON'T:**

- Import entire libraries (tree-shake instead)
- Block the main thread with heavy computation
- Skip memoization for expensive calculations
- Load all features upfront

### 3. CSS

✅ **DO:**

- Use Tailwind's JIT compiler
- Purge unused CSS in production
- Use CSS containment
- Minimize critical CSS

❌ **DON'T:**

- Import unused CSS
- Use CSS-in-JS without optimization
- Dynamically inject large stylesheets

### 4. Fonts

✅ **DO:**

- Preload critical fonts
- Use `font-display: swap`
- Subset fonts to required characters
- Use variable fonts when possible

❌ **DON'T:**

- Load fonts without preconnect
- Use multiple font files when one will do
- Skip font-display optimization

### 5. Build Configuration

✅ **DO:**

- Enable compression (Brotli + Gzip)
- Configure proper caching headers
- Use code splitting
- Analyze bundle with visualizer
- Set up CDN for static assets

❌ **DON'T:**

- Deploy without compression
- Skip bundle analysis
- Ignore chunk size warnings

## Performance Checklist

Before deploying:

- [ ] Run Lighthouse audit (all scores ≥ 90)
- [ ] Check bundle size (`npm run build:analyze`)
- [ ] Verify Web Vitals in production
- [ ] Test on slow 3G network
- [ ] Test on low-end devices
- [ ] Verify PWA installation
- [ ] Check service worker caching
- [ ] Validate image optimization
- [ ] Review network waterfall
- [ ] Check for render-blocking resources

## Tools

### Recommended Tools

1. **Chrome DevTools**
   - Performance tab
   - Lighthouse
   - Coverage tab
   - Network tab (throttling)

2. **WebPageTest**
   - https://www.webpagetest.org
   - Filmstrip view
   - Waterfall analysis

3. **Lighthouse CI**
   - Automated audits
   - Performance budgets
   - Trend analysis

4. **Bundle Analyzer**

   ```bash
   npm run build:analyze
   ```

5. **Web Vitals Extension**
   - Chrome extension for real-time metrics
   - https://chrome.google.com/webstore

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)
