import { describe, expect, it } from 'vitest';

describe('imports', () => {
    it('angular core', async () => {
        const x = await import('@angular/core');
        expect(x.Component).toBeDefined();
    });

    it('angular forms', async () => {
        const x = await import('@angular/forms');
        expect(x.FormsModule).toBeDefined();
    });

    it('angular common', async () => {
        const x = await import('@angular/common');
        expect(x.NgIf).toBeDefined();
    });

    it('text distributor', async () => {
        const x = await import('../../utils/text-distributor');
        expect(x).toBeDefined();
    });
});