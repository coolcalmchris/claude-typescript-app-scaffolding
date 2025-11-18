import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { PerformanceMonitor } from './components/PerformanceMonitor'

import './assets/styles/index.css'

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration)
      })
      .catch((error) => {
        console.log('SW registration failed:', error)
      })
  })
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <PerformanceMonitor />
    <App />
  </React.StrictMode>
)
