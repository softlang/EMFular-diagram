import { Component } from '@angular/core';
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {dragDropComponent, draggableInterface} from "./drag-drop.component.code";
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {RectDraggableComponent} from "./rect-draggable/rect-draggable.component";
import {FormControl, FormGroup} from "@angular/forms";
import {SVGAccessService} from "ngx-emfular-diagram";
import {SvgSimplePlaygroundComponent} from "../../layout/svg-simple-playground/svg-simple-playground.component";

@Component({
  selector: 'demo-drag-drop',
  imports: [
    HighlightedCodeComponent,
    SvgReactivePlaygroundComponent,
    RectDraggableComponent,
    SvgSimplePlaygroundComponent
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
      this.elemDrag0.position.x = value.x;
      this.elemDrag0.position.y = value.y;
      this.elemDrag0.color = value.color;
    });
  }

  formDrag0: FormGroup = new FormGroup({
    x: new FormControl(0, {nonNullable: true}),
    y: new FormControl(0, {nonNullable: true}),
    color: new FormControl("#000000", {nonNullable: true}),
  })

  elemDrag0 = {
    $gId: this.demo0id,
    color: this.formDrag0.value.color,
    position: {x: this.formDrag0.value.x, y: this.formDrag0.value.y, w: 20, h: 20 }
  }

  valueDrag1 = {
    x: 0,
    y: 0,
    color: '#000000'
  }

  elemDrag1 = {
    $gId: "demo1id",
    color: this.valueDrag1.color,
    position: {x: this.valueDrag1.x, y: this.valueDrag1.y, w: 20, h: 20 }

  }

  onClickFormDrag0() {
    this.formDrag0.patchValue({color: this.elemDrag0.color, x: this.elemDrag0.position.x, y: this.elemDrag0.position.y});
  }

  onPositionChangeFormDrag0() {
    this.formDrag0.patchValue({ x: this.elemDrag0.position.x, y: this.elemDrag0.position.y });
  }

  protected readonly dragDropComponent = dragDropComponent;
  protected readonly draggableInterface = draggableInterface;
}
