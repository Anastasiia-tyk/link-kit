import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 10000,
  use: {
    baseURL: 'http://localhost:5175',
    headless: true,
  },
  webServer: {
    command: 'npx vite --port 5175',
    port: 5175,
    timeout: 30000,
    reuseExistingServer: !process.env.CI,
  },
});