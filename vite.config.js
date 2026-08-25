import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the built app from /<repo-name>/, so the production
  // build needs that base path. Dev server stays at root.
  base: command === 'build' ? '/helios-field-ops/' : '/',
  plugins: [react(), tailwindcss()],
}))
