import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Dragger } from './dragger';
import { Positionable } from '../models/positionable';

describe('Dragger', () => {

    let elem: Positionable;
    let onPositionChange: ReturnType<typeof vi.fn>;
    let dragger: Dragger<Positionable>;

    beforeEach(() => {
        elem = {
            position: {
                x: 10,
                y: 20,
                w: 100,
                h: 50
            }
        };

        onPositionChange = vi.fn();
        dragger = new Dragger(elem, onPositionChange);
    });

    afterEach(() => {
        dragger.destroy();
    });

    it('starts inactive', () => {
        expect(dragger.dragActive).toBe(false);
        expect(dragger.wasReallyDragged).toBe(false);
    });

    it('starts a drag at the mouse position', () => {
        const event = new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 60
        });

        dragger.startDrag(event);

        expect(dragger.dragActive).toBe(true);
        expect(dragger.wasReallyDragged).toBe(false);
        expect(dragger.dragStartX).toBe(100);
        expect(dragger.dragStartY).toBe(60);
    });

    it('moves the element while dragging', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 60
        }));

        const event = new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 225
        });

        expect(dragger.drag(event)).toBe(true);

        expect(elem.position.x).toBe(20);
        expect(elem.position.y).toBe(185);
        expect(dragger.wasReallyDragged).toBe(true);
        expect(onPositionChange).toHaveBeenCalledOnce();
    });

    it('uses incremental movement when dragging', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 200
        }));

        dragger.drag(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 210
        }));

        dragger.drag(new MouseEvent('mousemove', {
            clientX: 115,
            clientY: 215
        }));

        expect(elem.position.x).toBe(25);
        expect(elem.position.y).toBe(35);
        expect(onPositionChange).toHaveBeenCalledTimes(2);
    });

    it('does not drag while inactive', () => {
        const event = new MouseEvent('mousemove', {
            clientX: 100,
            clientY: 200
        });

        expect(dragger.drag(event)).toBe(false);
        expect(dragger.dragActive).toBe(false);
        expect(elem.position.x).toBe(10);
        expect(elem.position.y).toBe(20);
        expect(onPositionChange).not.toHaveBeenCalled();
    });

    it('ends a drag', () => {
        dragger.startDrag(new MouseEvent('mousedown'));
        expect(dragger.dragActive).toBe(true);
        dragger.endDrag(new MouseEvent('mouseup'));
        expect(dragger.dragActive).toBe(false);
    });

    //*** global window events*****

    it('does not react to window mousemove before a drag starts', () => {
        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 100,
            clientY: 100
        }));
        expect(elem.position.x).toBe(10);
        expect(elem.position.y).toBe(20);
        expect(onPositionChange).not.toHaveBeenCalled();
    });

    it('reacts to window mousemove after starting a drag', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));
        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        expect(elem.position.x).toBe(20);
        expect(elem.position.y).toBe(40);
        expect(onPositionChange).toHaveBeenCalledOnce();
    });

    it('stops reacting to window mousemove after ending the drag', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        dragger.endDrag(new MouseEvent('mouseup'));

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 200,
            clientY: 200
        }));

        expect(elem.position.x).toBe(10);
        expect(elem.position.y).toBe(20);
        expect(onPositionChange).not.toHaveBeenCalled();
    });

    it('continues dragging when the mouse leaves the element', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        // This represents movement outside the SVG element.
        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 130
        }));

        expect(elem.position.x).toBe(60);
        expect(elem.position.y).toBe(50);
    });

    it('removes window listeners when destroyed', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        dragger.destroy();

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 200,
            clientY: 200
        }));

        expect(elem.position.x).toBe(10);
        expect(elem.position.y).toBe(20);
        expect(onPositionChange).not.toHaveBeenCalled();
        expect(dragger.dragActive).toBe(false);
    });


    //********** distinguish drag and click:
    it('treats a click as a click if no drag occurred', () => {
        expect(dragger.dragActive).toBe(false);
        expect(dragger.wasReallyDragged).toBe(false);
        const event = new MouseEvent('click');
        expect(dragger.clickElem(event)).toBe(true);
        expect(dragger.dragActive).toBe(false);
        expect(dragger.wasReallyDragged).toBe(false);
    });

    it('treats a click as dragEnd while dragActive', () => {
        dragger.startDrag(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 200
        }));
        expect(dragger.dragActive).toBe(true)
        expect(dragger.wasReallyDragged).toBe(false);
        dragger.drag(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 210
        }));
        expect(dragger.dragActive).toBe(true)
        expect(dragger.wasReallyDragged).toBe(true);

        expect(dragger.clickElem(new MouseEvent('click'))).toBe(false);
        expect(dragger.dragActive).toBe(false)
        expect(dragger.wasReallyDragged).toBe(false);
    });

    it('allows the next click after a drag', () => {
        dragger.startDrag(new MouseEvent('mousedown'));

        dragger.drag(new MouseEvent('mousemove', {
            clientX: 10,
            clientY: 10
        }));

        expect(dragger.clickElem(new MouseEvent('click'))).toBe(false);
        expect(dragger.clickElem(new MouseEvent('click'))).toBe(true);
    });

})