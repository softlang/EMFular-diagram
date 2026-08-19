import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SVGAccessService} from '../../services/svg-access.service';
import { Draggable } from '../../models/positionable';
import {Dragger} from "../../models/dragger";

@Component({
  imports: [],
  selector: '[input-draggable]',
  templateUrl: './input-draggable.component.svg'
})
export abstract class InputDraggableComponent<T extends Draggable> implements OnInit, AfterViewInit, OnChanges {

  @Input()  elem!: T;
  @Output() chooseElem = new EventEmitter<T>();

  elemDragger!: Dragger<T>;

  constructor(
    protected svgAccessService: SVGAccessService
  ) {}

  ngOnInit() {
    this.elemDragger = new Dragger<T>(this.elem);
  }

  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elem']) {
      this.elemDragger = new Dragger(this.elem);
    }
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
