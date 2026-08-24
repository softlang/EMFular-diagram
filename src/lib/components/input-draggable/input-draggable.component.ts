import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {SVGAccessService} from '../../services/svg-access.service';
import { Draggable } from '../../models/positionable';
import {Dragger} from "../../models/dragger";

@Component({
  imports: [],
  selector: '[input-draggable]',
  templateUrl: './input-draggable.component.svg'
})
export abstract class InputDraggableComponent<T extends Draggable> implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input()  elem!: T;
  @Output() chooseElem = new EventEmitter<T>();

  elemDragger!: Dragger<T>;

  constructor(
    protected svgAccessService: SVGAccessService
  ) {}


  private createDragger(elem: T): Dragger<T> {
    return new Dragger<T>(elem, ()=> this.svgAccessService.notifyPositionChange(elem.$gId));
  }


  ngOnInit() {
    this.elemDragger = this.createDragger(this.elem);
  }

  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elem']) {
      this.elemDragger?.destroy()
      this.elemDragger = this.createDragger(this.elem);
    }
  }

  startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
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
