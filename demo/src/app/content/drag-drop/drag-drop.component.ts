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
    y: new FormControl(0, {nonNullable: true})
  })

  protected readonly dragDropComponent = dragDropComponent;
  protected readonly draggableInterface = draggableInterface;
}
