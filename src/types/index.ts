/**
 * Common type definitions used throughout the application
 */

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

/**
 * Utility type to make specific properties required
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * Utility type to make specific properties optional
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Async function type
 */
export type AsyncFunction<Args extends unknown[] = [], Return = void> = (
  ...args: Args
) => Promise<Return>
