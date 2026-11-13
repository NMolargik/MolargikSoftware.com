import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { CF_BEACON_TOKEN } from './src/config/site'

/**
 * Renders the Cloudflare Web Analytics beacon into index.html when
 * CF_BEACON_TOKEN (src/config/site.ts) is set. With an empty token the
 * placeholder comment is simply removed and nothing is loaded.
 */
function cloudflareBeacon(): Plugin {
  return {
    name: 'cloudflare-beacon',
    transformIndexHtml(html) {
      const snippet = CF_BEACON_TOKEN
        ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${CF_BEACON_TOKEN}"}'></script>`
        : ''
      return html.replace('<!--cf-beacon-->', snippet)
    },
  }
}

export default defineConfig({
  define: { __BUILD_ISO__: JSON.stringify(new Date().toISOString()) },
  plugins: [react(), basicSsl(), cloudflareBeacon()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // The prerender build (`vite build --ssr`) bundles its dependencies so Node
  // resolves react-dom/static the way the bundler does.
  ssr: { noExternal: true },
  build: {
    target: ['es2020', 'safari14'],
  },
})
