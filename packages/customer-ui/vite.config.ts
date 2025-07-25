import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizationPlugin } from '../../config/visualization.plugin.ts'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizationPlugin()],
  css: {
    postcss: '../../config/postcss.config.js',
  },
  server: {
    port: 3301,
  },
})
