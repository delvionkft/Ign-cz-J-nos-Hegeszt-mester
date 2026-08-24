import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Sok hosztolási platform (Emergent is) egy saját PORT környezeti változót ad
// a folyamatnak, és arra várja a szervert. Ha az alkalmazás ehelyett mindig a
// fix 3000-es portot hallgatja, a platform proxyja soha nem éri el a valódi
// portot – ez a szerver folyamatos újraindításához, a böngészőben pedig
// látszólagos, végtelen oldal-újratöltéshez vezethet.
const port = Number(process.env.PORT) || 3000

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port,
    strictPort: true,
  },
  preview: {
    host: true,
    port,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
})
