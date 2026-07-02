import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {SVGAccessService} from '../../services/svg-access.service';
import { Draggable } from '../../models/positionable';
import {Dragger} from "../../models/dragger";

@Component({
  imports: [],
  selector: '[draggable]',
  templateUrl: './draggable.component.svg',
  styleUrl: './draggable.component.css'
})
export abstract class DraggableComponent<T extends Draggable> implements AfterViewInit {

  @Output() chooseElem = new EventEmitter<T>();
  //the caller must initialize both required elements (elem and elementDragger) either in the constructor
  // (or if they are inputs) in the ngOnInit life cycle hook
  elem!: T;
  elemDragger!: Dragger<T>;

  protected constructor(
    protected svgAccessService: SVGAccessService
  ) {}


  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId)
  }

  startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
  }

  drag(event: MouseEvent) {
    if (this.elemDragger.drag(event)) {
      this.svgAccessService.notifyPositionChange(this.elem.$gId)
    }
  }

  endDrag(event: MouseEvent) {
    this.elemDragger.endDrag(event);
  }

  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.chooseElem.emit(this.elem);
    }
  }

}
