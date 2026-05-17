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
  @Output('doubleClickElem') doubleClickElemEvent = new EventEmitter<T>();

  //the caller must initialize both required elements (elem and elementDragger) either in the constructor
  // (or if they are inputs) in the ngOnInit life cycle hook
  elem!: T;
  elemDragger!: Dragger<T>;

  private readonly clickDelayMs = 250;
  private clickTimer?: ReturnType<typeof setTimeout>;

  private boundDrag = (event: MouseEvent) => this.drag(event);
  private boundEndDrag = (event: MouseEvent) => this.endDrag(event);

  protected constructor(
    protected svgAccessService: SVGAccessService
  ) {}


  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId);
  }

  startDrag(event: MouseEvent) {
    this.clearPendingClick();
    this.elemDragger.startDrag(event);

    window.addEventListener('mousemove', this.boundDrag);
    window.addEventListener('mouseup', this.boundEndDrag);
  }

  drag(event: MouseEvent) {
    if (this.elemDragger.drag(event)) {
      this.clearPendingClick();
      this.svgAccessService.notifyPositionChange(this.elem.$gId);
    }
  }

  endDrag(event: MouseEvent) {
    this.elemDragger.endDrag(event);

    window.removeEventListener('mousemove', this.boundDrag);
    window.removeEventListener('mouseup', this.boundEndDrag);
  }

  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.clearPendingClick();

      this.clickTimer = setTimeout(() => {
        this.chooseElem.emit(this.elem);
        this.clickTimer = undefined;
      }, this.clickDelayMs);
    }
  }

  handleDoubleClickElem(event: MouseEvent) {
    this.clearPendingClick();

    if (this.elemDragger.doubleClickElem(event)) {
      this.doubleClickElemEvent.emit(this.elem);
    }
  }

  private clearPendingClick() {
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
      this.clickTimer = undefined;
    }
  }

}
