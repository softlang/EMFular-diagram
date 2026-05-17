import {Positionable} from './positionable';

export type InteractionState = 'idle' | 'pressed' | 'dragging';

export class Dragger<T extends Positionable> {
  elem: T;

  /** Minimum cursor movement in px before a pointer interaction becomes a drag. */
  dragThreshold = 5;

  interactionState: InteractionState = 'idle';
  dragActive = false;
  wasReallyDragged = false;

  private pointerDownX = 0;
  private pointerDownY = 0;
  private lastDragX = 0;
  private lastDragY = 0;
  private suppressNextClick = false;

  constructor(element: T, dragThreshold = 5) {
    this.elem = element;
    this.dragThreshold = dragThreshold;
  }

  startDrag(event: MouseEvent) {
    this.pointerDownX = event.clientX;
    this.pointerDownY = event.clientY;
    this.lastDragX = event.clientX;
    this.lastDragY = event.clientY;
    this.dragActive = true;
    this.wasReallyDragged = false;
    this.interactionState = 'pressed';
    event.stopPropagation();
  }

  // returns true in the case of a real drag event, false otherwise
  drag(event: MouseEvent): boolean {
    if (!this.dragActive) {
      return false;
    }

    const deltaFromStartX = event.clientX - this.pointerDownX;
    const deltaFromStartY = event.clientY - this.pointerDownY;
    const movedDistance = Math.hypot(deltaFromStartX, deltaFromStartY);

    if (this.interactionState === 'pressed' && movedDistance < this.dragThreshold) {
      return false;
    }

    this.interactionState = 'dragging';
    this.wasReallyDragged = true;
    this.suppressNextClick = true;
    event.preventDefault();
    event.stopPropagation();

    const dragX = event.clientX;
    this.elem.position.x += dragX - this.lastDragX;
    this.lastDragX = dragX;

    const dragY = event.clientY;
    this.elem.position.y += dragY - this.lastDragY;
    this.lastDragY = dragY;

    return true;
  }

  endDrag(event: MouseEvent) {
    if (this.interactionState === 'dragging') {
      this.suppressNextClick = true;
      event.preventDefault();
      event.stopPropagation();
    }

    this.dragActive = false;
    this.interactionState = 'idle';
  }

  // returns true if the click should be treated as click, false if it was from drag
  clickElem(event: MouseEvent): boolean {
    if (this.suppressNextClick || this.wasReallyDragged) {
      this.suppressNextClick = false;
      this.wasReallyDragged = false;
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    event.stopPropagation();
    return true;
  }

  // returns true if the double click should be treated as double click, false if it was from drag
  doubleClickElem(event: MouseEvent): boolean {
    if (this.suppressNextClick || this.wasReallyDragged || this.interactionState === 'dragging') {
      this.suppressNextClick = false;
      this.wasReallyDragged = false;
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    event.preventDefault();
    event.stopPropagation();
    return true;
  }

}