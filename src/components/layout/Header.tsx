/**
 * Header component
 */
export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              TypeScript App
            </h2>
          </div>
          <nav className="flex items-center space-x-6">
            <a
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
