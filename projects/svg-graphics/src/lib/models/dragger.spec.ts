import { Dragger } from './dragger';
import { Draggable } from './positionable';

describe('Dragger', () => {
  let elem: Draggable;
  let dragger: Dragger<Draggable>;

  function mouseEvent(type: string, x: number, y: number): MouseEvent {
    return new MouseEvent(type, {
      clientX: x,
      clientY: y,
      bubbles: true,
      cancelable: true
    });
  }

  beforeEach(() => {
    elem = {
      $gId: 'test-id',
      position: { x: 0, y: 0, w: 10, h: 10 }
    };

    dragger = new Dragger(elem, 5);
  });

  it('should not start dragging below threshold', () => {
    dragger.startDrag(mouseEvent('mousedown', 0, 0));

    const wasDragged = dragger.drag(mouseEvent('mousemove', 3, 3));

    expect(wasDragged).toBeFalse();
    expect(dragger.wasReallyDragged).toBeFalse();
    expect(elem.position.x).toBe(0);
    expect(elem.position.y).toBe(0);
  });

  it('should start dragging when movement exceeds threshold', () => {
    dragger.startDrag(mouseEvent('mousedown', 0, 0));

    const wasDragged = dragger.drag(mouseEvent('mousemove', 10, 0));

    expect(wasDragged).toBeTrue();
    expect(dragger.wasReallyDragged).toBeTrue();
    expect(elem.position.x).toBe(10);
    expect(elem.position.y).toBe(0);
  });

  it('should treat pointer interaction as click if no drag occurred', () => {
    dragger.startDrag(mouseEvent('mousedown', 0, 0));
    dragger.endDrag(mouseEvent('mouseup', 0, 0));

    const isClick = dragger.clickElem(mouseEvent('click', 0, 0));

    expect(isClick).toBeTrue();
  });

  it('should suppress click after drag', () => {
    dragger.startDrag(mouseEvent('mousedown', 0, 0));
    dragger.drag(mouseEvent('mousemove', 10, 0));
    dragger.endDrag(mouseEvent('mouseup', 10, 0));

    const isClick = dragger.clickElem(mouseEvent('click', 10, 0));

    expect(isClick).toBeFalse();
  });

  it('should suppress double click after drag', () => {
    dragger.startDrag(mouseEvent('mousedown', 0, 0));
    dragger.drag(mouseEvent('mousemove', 10, 0));
    dragger.endDrag(mouseEvent('mouseup', 10, 0));

    const isDoubleClick = dragger.doubleClickElem(mouseEvent('dblclick', 10, 0));

    expect(isDoubleClick).toBeFalse();
  });

  it('should allow double click if no drag occurred', () => {
    dragger.startDrag(mouseEvent('mousedown', 0, 0));
    dragger.endDrag(mouseEvent('mouseup', 0, 0));

    const isDoubleClick = dragger.doubleClickElem(mouseEvent('dblclick', 0, 0));

    expect(isDoubleClick).toBeTrue();
  });
});
