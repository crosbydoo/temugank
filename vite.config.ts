import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Vite config: React + Tailwind v4 plugin.
 * `@` alias keeps imports stable when folders grow (future API layer, etc.).
 */
const workspaceRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.join(workspaceRoot, 'src'),
    },
  },
})
