import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'

import { useCounterStore } from '@/stores'

import { Counter } from './Counter'

describe('Counter', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCounterStore.setState({ count: 0 })
  })

  it('renders the counter with initial count', () => {
    render(<Counter />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('increments the counter when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementButton = screen.getByRole('button', { name: /increment/i })
    await user.click(incrementButton)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('decrements the counter when decrement button is clicked', async () => {
    const user = userEvent.setup()
    useCounterStore.setState({ count: 5 })
    render(<Counter />)

    const decrementButton = screen.getByRole('button', { name: /decrement/i })
    await user.click(decrementButton)

    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('resets the counter when reset button is clicked', async () => {
    const user = userEvent.setup()
    useCounterStore.setState({ count: 10 })
    render(<Counter />)

    const resetButton = screen.getByRole('button', { name: /reset/i })
    await user.click(resetButton)

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
