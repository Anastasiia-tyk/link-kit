// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Де знаходиться index.html
  root: '.',

  build: {
    // Куди класти результат збірки
    outDir: 'dist',

    // Генерувати sourcemaps (для дебагу в продакшені)
    sourcemap: true,

    // Мініфікація через esbuild (найшвидший варіант)
    minify: 'esbuild',

    rollupOptions: {
      output: {
        // Хешовані назви файлів для cache-busting
        // Наприклад: index-Abc123.js
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