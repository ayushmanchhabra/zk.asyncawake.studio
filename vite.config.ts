/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['json', 'json-summary'],
      reportOnFailure: true,
    },
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts']
  },
})
