import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {SVGAccessService} from '../../shared/svg-access.service';
import {Dragger} from "../dragger";
import {Point2D} from "../../shared/models/point2d";

@Component({
  imports: [],
  selector: '[draggable]',
  templateUrl: './draggable.component.svg'
})
export abstract class DraggableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()  position!: Point2D;
  @Input() gId!: string
  @Output() elemReallyClicked = new EventEmitter<MouseEvent>();
  @Output() positionChanged = new EventEmitter<Point2D>();

  elemDragger!: Dragger;

  constructor(
    protected svgAccessService: SVGAccessService
  ) {}

  // dragger that notifies access service about dragging
  protected createDragger(pos: Point2D): Dragger {
    return new Dragger(pos, ()=> this.notifyPositionChange(pos));
  }

  protected notifyPositionChange(pos: Point2D): void {
    this.positionChanged.emit(pos);
    this.svgAccessService.notifyPositionChange(this.gId)
  }

  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.gId)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['position']) {
      this.elemDragger?.destroy()
      this.elemDragger = this.createDragger(this.position);
    }
  }

  startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
  }

  /**
   * call this on your template's click binding:
   * just forward click to dragger and only react, if that fires
   */
  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.elemReallyClicked.emit(event);
    }
  }

  ngOnDestroy() {
    this.elemDragger?.destroy();
  }

}
