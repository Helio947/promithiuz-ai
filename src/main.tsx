
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppWithProviders } from './App.tsx'
import './index.css'
import analytics from './utils/analytics.ts'
import { Toaster } from 'sonner'

// Initialize analytics
analytics.init({ debug: import.meta.env.DEV });

// Track the initial page view
analytics.trackPageView(window.location.pathname);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithProviders />
    <Toaster position="top-right" richColors />
  </React.StrictMode>,
)
