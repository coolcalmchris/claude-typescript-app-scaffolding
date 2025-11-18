import { useEffect, useRef, useState } from 'react'

interface LiveRegionProps {
  /** The message to announce to screen readers */
  message: string
  /** The politeness level of the announcement */
  politeness?: 'polite' | 'assertive' | 'off'
  /** Optional CSS class name */
  className?: string
}

/**
 * ARIA Live Region Component
 *
 * Announces dynamic content changes to screen readers.
 * Useful for form validation errors, loading states, success messages, etc.
 *
 * @example
 * ```tsx
 * // Polite announcement (waits for user to finish current action)
 * <LiveRegion message="3 new messages received" politeness="polite" />
 *
 * // Assertive announcement (interrupts immediately)
 * <LiveRegion message="Error: Form submission failed" politeness="assertive" />
 * ```
 */
export function LiveRegion({
  message,
  politeness = 'polite',
  className,
}: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={className}
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {message}
    </div>
  )
}

/**
 * Hook to manage live region announcements
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { announce, LiveRegionComponent } = useLiveRegion()
 *
 *   const handleSubmit = async () => {
 *     try {
 *       await submitForm()
 *       announce('Form submitted successfully')
 *     } catch (error) {
 *       announce('Error submitting form', 'assertive')
 *     }
 *   }
 *
 *   return (
 *     <>
 *       <form onSubmit={handleSubmit}>...</form>
 *       {LiveRegionComponent}
 *     </>
 *   )
 * }
 * ```
 */
export function useLiveRegion() {
  const [message, setMessage] = useState('')
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  const announce = (
    newMessage: string,
    newPoliteness: 'polite' | 'assertive' = 'polite',
    duration = 5000
  ) => {
    setMessage(newMessage)
    setPoliteness(newPoliteness)

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Clear message after duration
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        setMessage('')
      }, duration)
    }
  }

  const clear = () => {
    setMessage('')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const LiveRegionComponent = message ? (
    <LiveRegion message={message} politeness={politeness} />
  ) : null

  return {
    announce,
    clear,
    LiveRegionComponent,
  }
}

/**
 * Visually hidden but screen reader accessible component
 * Use for labels, hints, or additional context that should be read by screen readers
 * but not visible on the page
 */
export function VisuallyHidden({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <span
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {children}
    </span>
  )
}
