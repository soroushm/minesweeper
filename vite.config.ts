import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svelte(),
    svelteTesting({
      // disable auto cleanup
      autoCleanup: false,
      // disable browser resolution condition
      resolveBrowser: false,
    }),
  ],
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
})
