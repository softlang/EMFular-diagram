import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig({
  plugins: [
    angular()
  ],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [
        {browser: 'chromium'}
      ],
    },
  },
})
