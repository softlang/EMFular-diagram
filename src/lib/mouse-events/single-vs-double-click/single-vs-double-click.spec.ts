import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { SingleVsDblClick } from './single-vs-double-click';

describe('SingleVsDblClick', () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('emits a single click after the timeout', () => {
        vi.useFakeTimers();
        const clicker = new SingleVsDblClick(250);
        const singleClick = vi.fn();

        clicker.singleClick$.subscribe(singleClick);
        clicker.click();
        expect(singleClick).not.toHaveBeenCalled();

        vi.advanceTimersByTime(249);
        expect(singleClick).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(singleClick).toHaveBeenCalledOnce();
    });

    it('emits a double click when clicked twice before the timeout', () => {
        const clicker = new SingleVsDblClick(250);
        const singleClick = vi.fn();
        const doubleClick = vi.fn();

        clicker.singleClick$.subscribe(singleClick);
        clicker.doubleClick$.subscribe(doubleClick);

        clicker.click();
        vi.advanceTimersByTime(100);
        clicker.click();

        expect(doubleClick).toHaveBeenCalledOnce();
        expect(singleClick).not.toHaveBeenCalled();

        // The cancelled timer must not fire afterwards.
        vi.advanceTimersByTime(250);

        expect(singleClick).not.toHaveBeenCalled();
        expect(doubleClick).toHaveBeenCalledOnce();
    });

    it('allows another single click after a double click', () => {
        const clicker = new SingleVsDblClick(250);
        const singleClick = vi.fn();
        const doubleClick = vi.fn();

        clicker.singleClick$.subscribe(singleClick);
        clicker.doubleClick$.subscribe(doubleClick);

        clicker.click();
        clicker.click();

        expect(doubleClick).toHaveBeenCalledOnce();

        vi.advanceTimersByTime(250);
        expect(singleClick).not.toHaveBeenCalled();

        clicker.click();

        vi.advanceTimersByTime(250);

        expect(singleClick).toHaveBeenCalledOnce();
    });

    it('does not emit anything before a click', () => {
        const clicker = new SingleVsDblClick(250);
        const singleClick = vi.fn();
        const doubleClick = vi.fn();

        clicker.singleClick$.subscribe(singleClick);
        clicker.doubleClick$.subscribe(doubleClick);

        vi.advanceTimersByTime(1000);

        expect(singleClick).not.toHaveBeenCalled();
        expect(doubleClick).not.toHaveBeenCalled();
    });

    it('does not emit a pending single click after destroy', () => {
        const clicker = new SingleVsDblClick(250);
        const singleClick = vi.fn();

        clicker.singleClick$.subscribe(singleClick);

        clicker.click();
        clicker.destroy();

        vi.advanceTimersByTime(250);

        expect(singleClick).not.toHaveBeenCalled();
    });

    it.each([100, 500])(
        'uses the configured timeout of %ims',
        (timeout) => {
            const clicker = new SingleVsDblClick(timeout);
            const singleClick = vi.fn();

            clicker.singleClick$.subscribe(singleClick);

            clicker.click();

            vi.advanceTimersByTime(timeout - 1);
            expect(singleClick).not.toHaveBeenCalled();

            vi.advanceTimersByTime(1);
            expect(singleClick).toHaveBeenCalledOnce();

            clicker.destroy();
        }
    );

});