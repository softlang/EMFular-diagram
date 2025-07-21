import {Positionable} from './positionable';

export class Dragger<T extends Positionable> {
  elem: T;

  dragActive = false;
  wasReallyDragged = false;
  dragStartX: number = 0;
  dragStartY: number = 0;

  constructor(private element: T) {
    this.elem = element;
  }

  startDrag(event: MouseEvent) {
    console.log('startDrag');
    this.dragActive = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  }

  // returns true in the case of a real drag event, false otherwise
  drag(event: MouseEvent): boolean {
    if (this.dragActive) {
      this.wasReallyDragged = true;
      event.preventDefault();
      const dragX = event.clientX;
      this.elem.position.x+= (dragX - this.dragStartX);
      this.dragStartX = dragX;
      const dragY = event.clientY;
      this.elem.position.y+= (dragY - this.dragStartY);
      this.dragStartY = dragY;
      return true;
    }
    return false;
  }

  endDrag(event: MouseEvent) {
    console.log('endDrag');
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
