import {Component, Input, Output} from '@angular/core';
import {BoundingBox, DraggableComponent, RectangleComponent} from "ngx-emfular-diagram";

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
export class RectDraggableComponent extends DraggableComponent<MyPositionable> {
  

  @Input() position!: BoundingBox;
  @Input() id!: string;
  @Output() override clickElem(event: MouseEvent) {
    super.clickElem(event);
    this.elem.color = this.randomColor()
  }

  // this overwrites the elem: Positionable with our chosen type
  override elem: MyPositionable = {
    $gId: this.id,
    color: "#000000",
    position: this.position
  }

  randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

}
