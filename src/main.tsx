import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Legacy hash links (the site used HashRouter until November 2026):
// https://molargiksoftware.com/#/maestro -> /maestro, keeping any query.
const { hash } = window.location
if (hash.startsWith('#/')) {
  window.history.replaceState(null, '', hash.slice(1))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
