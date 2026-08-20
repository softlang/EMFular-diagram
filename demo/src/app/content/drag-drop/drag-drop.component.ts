import { Component } from '@angular/core';
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {dragDropComponent, draggableInterface} from "./drag-drop.component.code";
import {SimplePlaygroundComponent} from "../../layout/simple-playground/simple-playground.component";
import {RectDraggableComponent} from "./rect-draggable/rect-draggable.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'demo-drag-drop',
  imports: [
    HighlightedCodeComponent,
    SimplePlaygroundComponent,
    RectDraggableComponent
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent {

  formDrag0: FormGroup = new FormGroup({
    x: new FormControl(0, {nonNullable: true}),
    y: new FormControl(0, {nonNullable: true}),
    color: new FormControl("#000000", {nonNullable: true}),
  })

  valueDrag0 = {
    id: 'demo-rect-drag',
    color: this.formDrag0.value.color,
    position: {x: this.formDrag0.value.x, y: this.formDrag0.value.y, w: 20, h: 20 }
  }

  onChangeFormDrag0Ext() {
    this.formDrag0.patchValue({color: this.valueDrag0.color, x: this.valueDrag0.position.x, y: this.valueDrag0.position.y});
  }

  protected readonly dragDropComponent = dragDropComponent;
  protected readonly draggableInterface = draggableInterface;
}
