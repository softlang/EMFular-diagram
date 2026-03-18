import {Positionable} from './positionable';

export class Dragger<T extends Positionable> {
  elem: T;

  dragActive = false;
  wasReallyDragged = false;
  dragStartX: number = 0;
  dragStartY: number = 0;

  constructor(element: T) {
    this.elem = element;
  }

  startDrag(event: MouseEvent) {
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragActive = true;
  }

  // returns true in the case of a real drag event, false otherwise
  drag(event: MouseEvent): boolean {
    if (this.dragActive) {
      this.wasReallyDragged = true;
      event.preventDefault();

      const dragX = event.clientX;
      const dragY = event.clientY;

      const deltaX = dragX - this.dragStartX;
      const deltaY = dragY - this.dragStartY;

      // IMMUTABLE UPDATE
      this.elem.position = {
        ...this.elem.position,
        x: this.elem.position.x + deltaX,
        y: this.elem.position.y + deltaY
      };

      this.dragStartX = dragX;
      this.dragStartY = dragY;

      return true;
    }
    return false;
  }

  endDrag(event: MouseEvent) {
    this.dragActive = false;
    // todo was working for click vs drag, not now setTimeout(() => {this.dragActive = false;}, 50);
    event.preventDefault();
  }

  //returns true if the click should be treated as click, false if it was from drag
  clickElem(event: MouseEvent): boolean {
    if (this.wasReallyDragged) {
      this.wasReallyDragged = false;
      return false;
    } else {
      event.preventDefault();
      return true;
    }
  }

}
