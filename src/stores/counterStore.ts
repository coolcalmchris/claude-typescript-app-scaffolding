import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (amount: number) => void
}

/**
 * Counter store using Zustand
 * Demonstrates state management with middleware (devtools, persist)
 */
export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        incrementByAmount: (amount: number) =>
          set((state) => ({ count: state.count + amount })),
      }),
      {
        name: 'counter-storage',
      }
    ),
    {
      name: 'CounterStore',
    }
  )
)
