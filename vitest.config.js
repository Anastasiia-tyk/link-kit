// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',

  // 1. ДОДАНО СЕКЦІЮ ТЕСТУВАННЯ
  test: {
    // Вказуємо Vitest ігнорувати папку з E2E тестами (Playwright)
    exclude: [
      '**/node_modules/**', 
      '**/dist/**', 
      '**/tests/e2e/**', // ігноруємо Playwright тести
      '**/.{idea,git,cache,output,temp}/**'
    ],
    // Оточення для тестів, що працюють з DOM
    environment: 'jsdom',
    globals: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
  },
});