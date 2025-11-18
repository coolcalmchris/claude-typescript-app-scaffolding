import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

/**
 * Main layout component that wraps the application
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
