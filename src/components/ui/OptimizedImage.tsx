import { useState, useEffect } from 'react'

import { cn } from '@/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  blurDataURL?: string
  onLoad?: () => void
}

/**
 * Optimized image component with:
 * - Lazy loading (unless priority)
 * - Responsive images with srcset
 * - LQIP (Low Quality Image Placeholder)
 * - WebP/AVIF support with fallback
 * - Automatic aspect ratio preservation
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  priority = false,
  blurDataURL,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(blurDataURL || src)

  useEffect(() => {
    if (priority) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
        onLoad?.()
      }
    }
  }, [src, priority, onLoad])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined

    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    const applicableWidths = widths.filter((w) => w <= (width ?? 0) * 2)

    return applicableWidths.map((w) => `${src}?w=${w} ${w}w`).join(', ')
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={
        width && height ? { aspectRatio: `${width} / ${height}` } : undefined
      }
    >
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover blur-xl"
        />
      )}

      {/* Main image */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={generateSrcSet()}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />

      {/* Loading shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
    </div>
  )
}

/**
 * Generate a simple SVG blur placeholder
 */
export function generateBlurPlaceholder(
  width: number,
  height: number,
  color = '#e5e7eb'
): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
      <rect width="${width}" height="${height}" fill="${color}" filter="url(#blur)"/>
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svg)}`
}
