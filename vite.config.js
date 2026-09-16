import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // The Indirect Prompt Injection lab talks to a local Ollama server.
      // Proxying keeps the browser same-origin, so the lab is not tied to a
      // particular dev port. Dev only — `vite preview` does not proxy.
      '/ollama': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ollama/, ''),
      },
    },
  },
})
