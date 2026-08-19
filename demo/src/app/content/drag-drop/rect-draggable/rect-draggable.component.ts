import {Component, Output} from '@angular/core';
import {BoundingBox, InputDraggableComponent, RectangleComponent} from "ngx-emfular-diagram";
import {v4 as uuidv4} from "uuid";

export interface MyPositionable {
  $gId: string;
  position: BoundingBox;
  color: string;
}

@Component({
  selector: '[demo-rect]',
  imports: [RectangleComponent],
  templateUrl: './rect-draggable.component.svg',
  styleUrl: './rect-draggable.component.css'
})
export class RectDraggableComponent extends InputDraggableComponent<MyPositionable> {

  @Output() override clickElem(event: MouseEvent) {
    super.clickElem(event);
    console.log("Clicked")
    this.elem.color = this.randomColor()
  }

  randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

}
