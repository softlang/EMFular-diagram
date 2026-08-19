import { Component } from '@angular/core';
import {HighlightedCodeComponent} from "../../layout/highlighted-code/highlighted-code.component";
import {dragDropComponent, draggableInterface} from "./drag-drop.component.code";
import {SimplePlaygroundComponent} from "../../layout/simple-playground/simple-playground.component";

@Component({
  selector: 'demo-drag-drop',
  imports: [
    HighlightedCodeComponent,
    SimplePlaygroundComponent
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css'
})
export class DragDropComponent {

  protected readonly dragDropComponent = dragDropComponent;
  protected readonly draggableInterface = draggableInterface;
}
