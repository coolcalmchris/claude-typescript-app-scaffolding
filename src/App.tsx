import { Layout } from '@/components/layout/Layout'
import { Counter } from '@/features/counter/Counter'

function App() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            TypeScript App Scaffolding
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            A modern, scalable TypeScript application with state-of-the-art
            tooling and best practices.
          </p>
          <Counter />
        </div>
      </div>
    </Layout>
  )
}

export default App
