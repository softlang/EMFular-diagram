import { Component } from '@angular/core';
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {
  BindingsForDrag,
  dragDropComponent,
  draggableInterface, exampleDragRect,
  inputDraggableTemplate
} from "./drag-drop.component.code";
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {RectDraggableComponent} from "./rect-draggable/rect-draggable.component";
import {FormControl, FormGroup} from "@angular/forms";
import {SVGAccessService} from "ngx-emfular-diagram";

@Component({
  selector: 'demo-drag-drop',
  imports: [
    HighlightedCodeComponent,
    SvgReactivePlaygroundComponent,
    RectDraggableComponent
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent {

  demo0id = 'demo-rect-drag'

  constructor(svgAccessService: SVGAccessService) {
    svgAccessService.positionChange.subscribe(position => {
      if(position == this.demo0id) {
        this.onPositionChangeFormDrag0()
      }
    })
    //also bind form changes to the object:
    this.formDrag0.valueChanges.subscribe(value => {
      this.valueDrag0.position.x = value.x;
      this.valueDrag0.position.y = value.y;
      this.valueDrag0.color = value.color;
    });
  }

  formDrag0: FormGroup = new FormGroup({
    x: new FormControl(0, {nonNullable: true}),
    y: new FormControl(0, {nonNullable: true}),
    color: new FormControl("#000000", {nonNullable: true}),
  })

  valueDrag0 = {
    $gId: this.demo0id,
    color: this.formDrag0.value.color,
    position: {x: this.formDrag0.value.x, y: this.formDrag0.value.y, w: 20, h: 20 }
  }

  onClickFormDrag0() {
    this.formDrag0.patchValue({color: this.valueDrag0.color, x: this.valueDrag0.position.x, y: this.valueDrag0.position.y});
  }

  onPositionChangeFormDrag0() {
    this.formDrag0.patchValue({ x: this.valueDrag0.position.x, y: this.valueDrag0.position.y });
  }

  protected readonly dragDropComponent = dragDropComponent;
  protected readonly draggableInterface = draggableInterface;
  protected readonly BindingsForDrag = BindingsForDrag;
  protected readonly inputDraggableTemplate = inputDraggableTemplate;
  protected readonly exampleDragRect = exampleDragRect;
}
