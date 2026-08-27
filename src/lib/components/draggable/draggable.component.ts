import {AfterViewInit, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {SVGAccessService} from '../../services/svg-access.service';
import { Draggable } from '../../models/positionable';
import {Dragger} from "../../utils/dragger";


/**
 * @deprecated: use InputDraggable component to get the whole expertise on wiring the svg access service in - it will replace this base component in the next major release
 */
@Component({
  imports: [],
  selector: '[draggable]',
  templateUrl: './draggable.component.svg'
})
export abstract class DraggableComponent<T extends Draggable> implements AfterViewInit, OnDestroy {

  @Output() chooseElem = new EventEmitter<T>();
  /**
   *   the caller must initialize both required elements (elem and elementDragger) either in the constructor
   *   (or if the elem is an input) in the ngOnInit life cycle hook;
   *   if the elem is an input, consider using the INputDragger as base component
   */
  elem!: T;
  elemDragger!: Dragger<T>;

  constructor(
    protected svgAccessService: SVGAccessService
    //you must install a callback on the dragger and make sure to notify the svgaccessservice
  ) {}


  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId)
  }

  startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
  }

  /**
   * @deprecated dragger now handles them internally
   * @param event
   */
  drag(event: MouseEvent) {
    console.error("Deprecated call to drag, please just register a callback on the dragger")
    if (this.elemDragger.drag(event)) {
      this.svgAccessService.notifyPositionChange(this.elem.$gId)
    }
  }

  /**
   * @deprecated dragger now handles them internally
   * @param event
   */
  endDrag(event: MouseEvent) {
    console.error("Deprecated call to drag, please just register a callback on the dragger")
    this.elemDragger.endDrag(event);
  }

  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.chooseElem.emit(this.elem);
    }
  }

  ngOnDestroy() {
    this.elemDragger?.destroy();
  }

}
