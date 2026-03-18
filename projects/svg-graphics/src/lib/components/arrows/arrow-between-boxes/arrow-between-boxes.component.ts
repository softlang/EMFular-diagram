import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges,} from '@angular/core';
import { Point } from "@angular/cdk/drag-drop";
import {BoundingBox} from "../../../models/bounding-box";
import {PathLayouter} from "../../../utils/path-layouter";
import {ArrowBetweenPointsComponent} from "../arrow-between-points/arrow-between-points.component";

@Component({
    selector: '[arrow-between-boxes]',
    templateUrl: './arrow-between-boxes.component.svg',
    styleUrl: './arrow-between-boxes.component.css',
    imports: [ArrowBetweenPointsComponent]
})
export class ArrowBetweenBoxesComponent implements AfterViewInit {

  private _start!: BoundingBox;
  @Input() set start(bb: BoundingBox) {
    this._start = bb;
    if (this.positioned) this.computePositions();
  }

  private _end!: BoundingBox;
  @Input() set end(bb: BoundingBox) {
    this._end = bb;
    if (this.positioned) this.computePositions();
  }

  @Input() arrowType?: string;
  @Input() text?: string;
  @Input() style?: string;

  x1 = 0;
  y1 = 0;
  x2 = 5;
  y2 = 5;

  positioned = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.computePositions();
    this.positioned = true;
    this.cdr.detectChanges();
  }

  private computePositions() {
    const res = PathLayouter.bestPoints(this._start, this._end);
    this.applyBestPoints(res);
  }

  private applyBestPoints(res: Point[]) {
    this.x1 = res[0].x;
    this.y1 = res[0].y;
    this.x2 = res[1].x;
    this.y2 = res[1].y;
  }
}
