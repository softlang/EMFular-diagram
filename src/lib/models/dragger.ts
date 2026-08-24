import {Positionable} from './positionable';

export class Dragger<T extends Positionable> {
  elem: T;

  dragActive = false;
  wasReallyDragged = false;
  dragStartX: number = 0;
  dragStartY: number = 0;

  private readonly boundDrag = (event: MouseEvent) => {
    console.log('WINDOW LISTENER', this.elem, this.dragActive);
    this.drag(event);
  };

  private readonly boundEndDrag = (event: MouseEvent) => {
    this.endDrag(event);
  };


  constructor(public element: T, private readonly onPositionChange: () => void = ()=>{}) {
    this.elem = element;
  }

  startDrag(event: MouseEvent) {
    console.log('START DRAG', this.elem);
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragActive = true;
    this.wasReallyDragged = false;

    console.log('REGISTER WINDOW LISTENER', this.elem);
    window.addEventListener('mousemove', this.boundDrag);
    window.addEventListener('mouseup', this.boundEndDrag);
    console.log("Start drag-e")
  }

  // returns true in the case of a real drag event, false otherwise
  drag(event: MouseEvent): boolean {
    console.log("Consider drag", event);
    if (this.dragActive) {
      this.wasReallyDragged = true;
      event.preventDefault();
      const dragX = event.clientX;
      this.elem.position.x+= (dragX - this.dragStartX);
      this.dragStartX = dragX;
      const dragY = event.clientY;
      this.elem.position.y+= (dragY - this.dragStartY);
      this.dragStartY = dragY;
      this.onPositionChange();
      return true;
    }
    console.trace("Inactive drag "+this.elem)
    return false;
  }

  endDrag(event: MouseEvent) {
    console.log("End drag-s", event);
    this.dragActive = false;

    window.removeEventListener('mousemove', this.boundDrag);
    window.removeEventListener('mouseup', this.boundEndDrag);

    event.preventDefault();
    console.log("End drag-e")
  }

  //returns true if the click should be treated as click, false if it was from drag
  clickElem(event: MouseEvent): boolean {
    event.preventDefault();
    if (this.wasReallyDragged) {
      this.dragActive = false;
      this.wasReallyDragged = false;
      console.log('No click')
      return false;
    } else {
      console.log('click')
      return true;
    }
  }

  destroy() {
    window.removeEventListener('mousemove', this.boundDrag);
    window.removeEventListener('mouseup', this.boundEndDrag);
    this.dragActive = false;
  }

}
