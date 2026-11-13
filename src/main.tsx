import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Legacy hash links (the site used HashRouter until November 2026):
// https://molargiksoftware.com/#/maestro -> /maestro, keeping any query.
const { hash } = window.location
const rewroteHash = hash.startsWith('#/')
if (rewroteHash) {
  window.history.replaceState(null, '', hash.slice(1))
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Every route in src/seo/routes.mjs ships prerendered HTML (scripts/postbuild-seo.mjs),
// so hydrate it when the prerendered route (data-prerender) is the page being
// shown. Render from scratch otherwise: dev server, 404.html (used for /go/...
// links), a rewritten legacy hash link, the opalite.* subdomain that serves
// Opalite Web at "/", or a host that falls back to index.html for another path.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const canHydrate =
  root.dataset.prerender === currentPath && !rewroteHash && !window.location.hostname.startsWith('opalite.')
if (canHydrate) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
