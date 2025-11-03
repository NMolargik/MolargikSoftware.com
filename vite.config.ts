import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows access from your local network
    port: 5173,      // Ensure this matches the port shown in your terminal
  },
})