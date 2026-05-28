import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from /<repo-name>/.
// Keep dev server at root, but build production assets with the repo base path.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/-AI_Life_Helper/' : '/',
  plugins: [react()],
}))
