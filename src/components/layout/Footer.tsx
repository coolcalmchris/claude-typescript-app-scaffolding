/**
 * Footer component
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-center">
          <p className="text-sm text-gray-600">
            {currentYear} TypeScript App. Built with modern tooling.
          </p>
        </div>
      </div>
    </footer>
  )
}
