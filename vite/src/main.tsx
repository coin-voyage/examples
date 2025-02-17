import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './globals.css'
import { Providers } from './providers/providers'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <main className="space-y-4 mx-auto max-w-2xl p-8 lg:max-w-7xl">
        <App />
      </main>
    </Providers>
  </React.StrictMode>
)
