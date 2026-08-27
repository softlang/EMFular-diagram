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
import {Dragger} from "../../utils/dragger";

@Component({
  imports: [],
  selector: '[input-draggable]',
  templateUrl: './input-draggable.component.svg'
})
export abstract class InputDraggableComponent<T extends Draggable> implements AfterViewInit, OnChanges, OnDestroy {

  @Input()  elem!: T;
  @Output() elemReallyClicked = new EventEmitter<T>();

  elemDragger!: Dragger<T>;

  constructor(
    protected svgAccessService: SVGAccessService
  ) {}

  // dragger that notifies access service about dragging
  private createDragger(elem: T): Dragger<T> {
    return new Dragger<T>(elem, ()=> this.svgAccessService.notifyPositionChange(elem.$gId));
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

  /**
   * call this on your template's click binding:
   * just forward click to dragger and only react, if that fires
   * You can add reactions prior to emit via the onClick hook
   */
  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.onClick();
      this.elemReallyClicked.emit(this.elem);
    }
  }

  /**
   * @protected
   * Only adapt this to add a prior reaction to really detected clicks
   */
  protected onClick() {
  }

  ngOnDestroy() {
    this.elemDragger?.destroy();
  }

}
