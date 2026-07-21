import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        globals: true,
        browser: {
            enabled: true,
            name: 'chromium',
            provider: playwright()
        }
    }
});
