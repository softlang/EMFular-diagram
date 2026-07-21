import { describe, it, expect } from 'vitest';
import { PlainComponent } from './test-comp.component';

describe('plain', () => {
    it('imports', () => {
        expect(PlainComponent).toBeDefined();
    });
});