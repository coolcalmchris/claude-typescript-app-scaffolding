/**
 * Utility for conditionally joining classNames together
 * @param classes - Class names to join
 * @returns Joined class names
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
