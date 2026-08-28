import { Component } from '@angular/core';
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {
  BindingsForDrag,
  draggableInterface, exampleDragRect,
  inputDraggableTemplate
} from "./drag-drop.component.code";
import {SvgReactivePlaygroundComponent} from "../../layout/svg-reactive-playground/svg-reactive-playground.component";
import {RectDraggableComponent} from "./rect-draggable/rect-draggable.component";
import {FormControl, FormGroup} from "@angular/forms";
import {SVGAccessService} from "ngx-emfular-diagram";
import {DblclickRectComponent} from "./dblclick-rect/dblclick-rect.component";

@Component({
  selector: 'demo-drag-drop',
  imports: [
    HighlightedCodeComponent,
    SvgReactivePlaygroundComponent,
    RectDraggableComponent,
    DblclickRectComponent
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent {

  demo0id = 'demo-rect-drag'
  demo1id = 'dblclick0'

  constructor(svgAccessService: SVGAccessService) {
    svgAccessService.positionChange.subscribe(position => {
      if(position == this.demo0id) {
        this.onPositionChangeFormDrag0()
      } else if(position == this.demo1id) {
        this.onPositionChangeFormDblClick0()
      }
    })
    //also bind form changes to the object:
    this.formDrag0.valueChanges.subscribe(value => {
      this.valueDrag0.position.x = value.x;
      this.valueDrag0.position.y = value.y;
      this.valueDrag0.color = value.color;
    });
    this.formDblClick0.valueChanges.subscribe(value => {
      this.valueDblCl.position.x = value.x;
      this.valueDblCl.position.y = value.y;
      this.valueDblCl.position.w = value.w;
      this.valueDblCl.position.h = value.h;
      this.valueDblCl.color = value.color;
    })
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

  formDblClick0 = new FormGroup({
    timeout: new FormControl(250, {nonNullable: true}),
    x: new FormControl(0, {nonNullable: true}),
    y: new FormControl(0, {nonNullable: true}),
    w: new FormControl(30, {nonNullable: true}),
    h: new FormControl(20, {nonNullable: true}),
    color: new FormControl("#000000", {nonNullable: true}),

  })

  valueDblCl = {
    $gId: this.demo1id,
    color: this.formDblClick0.value.color,
    position: {x: this.formDblClick0.value.x, y: this.formDblClick0.value.y, w: this.formDblClick0.value.w, h: this.formDblClick0.value.h }
  }

  onPositionChangeFormDblClick0() {
    this.formDblClick0.patchValue({x: this.valueDblCl.position.x, y: this.valueDblCl.position.y})
  }

  onSingleClickFormDblClick0() {
    this.formDblClick0.patchValue({color: this.valueDblCl.color})
  }

  onDoubleClickFormDblClick0() {
    this.formDblClick0.patchValue({ w: this.valueDblCl.position.w, h: this.valueDblCl.position.h})
  }

  protected readonly draggableInterface = draggableInterface;
  protected readonly BindingsForDrag = BindingsForDrag;
  protected readonly inputDraggableTemplate = inputDraggableTemplate;
  protected readonly exampleDragRect = exampleDragRect;
}
