import {
  AfterViewInit,
  Directive, ElementRef,
  EventEmitter, HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {SVGAccessService} from '../../shared/svg-access.service';
import {Dragger} from "../dragger/dragger";
import {Point2D} from "../../shared/models/point2d";

@Directive({
  selector: '[dragPosition]',
})
export class DraggableDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() dragPosition!: Point2D;
  @Output() elemReallyClicked = new EventEmitter<MouseEvent>();
  @Output() positionChanged = new EventEmitter<Point2D>();

  private elemDragger!: Dragger;

  constructor(
    private readonly svgAccessService: SVGAccessService,
    private readonly elementRef: ElementRef<SVGElement>
  ) {}

  // dragger that notifies access service about dragging
  private createDragger(): Dragger {
    return new Dragger(
        () => this.dragPosition,
        position => this.notifyPositionChange(position)
    );
  }

  private notifyPositionChange(pos: Point2D): void {
    this.positionChanged.emit(pos);
    this.svgAccessService.notifyPositionChange(
        this.elementRef.nativeElement.id
    )
  }

  ngOnInit() {
    this.elemDragger = this.createDragger()
  }

  //originally to notify arrows of successful placement
  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(
        this.elementRef.nativeElement.id
    )
  }

  @HostListener('mousedown', ['$event'])
  private startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
  }

  /**
   * just forward click to dragger and only react, if that fires
   * this only emits on real clicks, not on drag start or end
   */
  @HostListener('click', ['$event'])
  private clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.elemReallyClicked.emit(event);
    }
  }

  ngOnDestroy() {
    this.elemDragger?.destroy();
  }

}
