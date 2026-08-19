import {Component, Input, OnInit, Output} from '@angular/core';
import {BoundingBox, DraggableComponent, Dragger, RectangleComponent} from "ngx-emfular-diagram";
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
export class RectDraggableComponent extends DraggableComponent<MyPositionable> implements OnInit {
  @Input() position: BoundingBox = {x: 0, y: 0, w:1, h: 1};
  @Input() id: string = uuidv4();
  @Output() override clickElem(event: MouseEvent) {
    super.clickElem(event);
    console.log("Clicked")
    this.elem.color = this.randomColor()
  }

  // this overwrites the elem: Positionable with our chosen type
  override elem: MyPositionable = {
    $gId: this.id,
    color: "#000000",
    position: this.position
  }

  ngOnInit() {
    this.elem.position = this.position;
    console.log(this.elem.position);
    this.elemDragger = new Dragger(this.elem);
  }

  randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

}
