import {Component, Input} from '@angular/core';
import {BoundingBox, DraggableDirective, RectangleComponent} from "ngx-emfular-diagram";

export interface MyPositionable {
  $gId: string;
  position: BoundingBox;
  color: string;
}

@Component({
  selector: '[demo-rect]',
  imports: [RectangleComponent, DraggableDirective],
  templateUrl: './rect-draggable.component.svg',
  styleUrl: './rect-draggable.component.css'
})
export class RectDraggableComponent {

  @Input() elem!: MyPositionable;

  onRealClick() {
    this.elem.color = this.randomColor()
  }

  private randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

}
