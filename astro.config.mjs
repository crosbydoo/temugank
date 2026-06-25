import path from 'node:path'
import { fileURLToPath } from 'node:url'

import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url))

/** Pre-bundle SSR deps in one pass — avoids workerd reload desyncing React hooks (Astro 6 + Cloudflare). */
const SERVER_OPTIMIZE_DEPS = [
  'react',
  'react-dom',
  'react-dom/server.edge',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'framer-motion',
]

function optimizeServerDeps() {
  return {
    name: 'optimize-server-deps',
    configEnvironment(name) {
      if (name !== 'client') {
        return {
          optimizeDeps: {
            include: SERVER_OPTIMIZE_DEPS,
          },
        }
      }
    },
  }
}

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react()],
  vite: {
    plugins: [optimizeServerDeps(), tailwindcss()],
    optimizeDeps: {
      include: SERVER_OPTIMIZE_DEPS,
    },
    resolve: {
      alias: {
        '@': path.join(workspaceRoot, 'src'),
        'react-dom/server': 'react-dom/server.edge',
      },
      dedupe: ['react', 'react-dom'],
      tsconfigPaths: true,
    },
  },
})
