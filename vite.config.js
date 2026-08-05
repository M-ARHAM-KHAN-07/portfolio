import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/
// so assets need a base path of "/<repo>/". The deploy workflow sets VITE_BASE
// automatically; locally it falls back to "/".
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
