import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            reporter: ['text', 'html'],
            reportsDirectory: './coverage'
        }
    }
});
