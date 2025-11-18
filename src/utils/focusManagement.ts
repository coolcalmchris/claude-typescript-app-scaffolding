/**
 * Focus Management Utilities for Accessibility
 * Helps manage keyboard focus in a predictable and accessible way
 */

/**
 * Trap focus within a specific element (useful for modals, dialogs)
 * Returns a cleanup function to remove the event listener
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = getFocusableElements(element)
  if (!focusableElements || focusableElements.length === 0) {
    return () => {} // No focusable elements, return no-op cleanup
  }

  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable?.focus()
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown)

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(
  container: HTMLElement
): HTMLElement[] | null {
  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ].join(',')

  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter((el) => {
    // Filter out elements that are not visible
    return (
      el.offsetWidth > 0 &&
      el.offsetHeight > 0 &&
      window.getComputedStyle(el).visibility !== 'hidden'
    )
  })
}

/**
 * Store the currently focused element and restore it later
 * Useful when opening/closing modals or dialogs
 */
export function createFocusStore() {
  let previouslyFocusedElement: HTMLElement | null = null

  return {
    store: () => {
      previouslyFocusedElement = document.activeElement as HTMLElement
    },
    restore: () => {
      if (previouslyFocusedElement?.focus) {
        previouslyFocusedElement.focus()
        previouslyFocusedElement = null
      }
    },
  }
}

/**
 * Focus the first focusable element in a container
 */
export function focusFirstElement(container: HTMLElement): void {
  const focusableElements = getFocusableElements(container)
  focusableElements?.[0]?.focus()
}

/**
 * React hook for focus trap
 * Usage in a modal/dialog component:
 *
 * const dialogRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(dialogRef, isOpen)
 */
export function useFocusTrap(
  _elementRef: React.RefObject<HTMLElement>,
  _isActive: boolean
): void {
  // This is a plain TypeScript file, but we provide the hook pattern
  // Import this in a React component and implement:
  /*
  useEffect(() => {
    if (!isActive || !elementRef.current) return

    const cleanup = trapFocus(elementRef.current)
    focusFirstElement(elementRef.current)

    return cleanup
  }, [isActive, elementRef])
  */
}

/**
 * React hook for restoring focus
 * Usage:
 *
 * const focusStore = useFocusRestore(isModalOpen)
 */
export function useFocusRestore(_isActive: boolean): void {
  // Import this in a React component and implement:
  /*
  const focusStore = useRef(createFocusStore())

  useEffect(() => {
    if (isActive) {
      focusStore.current.store()
    } else {
      focusStore.current.restore()
    }
  }, [isActive])
  */
}
