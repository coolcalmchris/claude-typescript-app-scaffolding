import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for conditionally joining and merging Tailwind CSS classes
 * Uses clsx for conditional classes and tailwind-merge for proper deduplication
 * @param inputs - Class names to join and merge
 * @returns Merged class names
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (px-2 is overridden)
 * cn('text-red-500', condition && 'text-blue-500') // => conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
