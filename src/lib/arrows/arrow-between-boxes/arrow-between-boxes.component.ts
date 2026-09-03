import { AfterViewInit, ChangeDetectorRef, Component, Input,} from '@angular/core';
import {v4 as uuidv4} from "uuid";
import {BoundingBox} from "../../shared/models/bounding-box";
import {PathLayouter} from "../utils/path-layouter";
import {ArrowBetweenPointsComponent} from "../arrow-between-points/arrow-between-points.component";
import {ArrowStyle, DEFAULT_ARROW_STYLE} from "../arrow-style";
import {SvgTextPathStyle} from "../../shared/style-configs/svg-text-path-style";
import {SvgTextStyle, DEFAULT_TEXT_STYLE} from "../../shared/style-configs/svg-text-style";

@Component({
    selector: '[arrow-between-boxes]',
    templateUrl: './arrow-between-boxes.component.svg',
    imports: [ArrowBetweenPointsComponent]
})
export class ArrowBetweenBoxesComponent implements AfterViewInit {
  @Input() id = uuidv4();
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

  @Input() arrowStyle: ArrowStyle = DEFAULT_ARROW_STYLE;

  @Input() text?: string;
  @Input() textStyle: SvgTextStyle = DEFAULT_TEXT_STYLE;
  @Input() textPathStyle: SvgTextPathStyle = {};

  x1: number = 0;
  y1: number = 0;
  x2: number = 5;
  y2: number = 5;

  private positioned= false;

  constructor(
    private cdr: ChangeDetectorRef,
    ) {}

  ngAfterViewInit() {
    this.computePositions()
    this.positioned = true;
    this.cdr.detectChanges();
  }

  private computePositions() {
    const res = PathLayouter.bestPoints(this._start, this._end);
    this.x1 = res[0].x;
    this.y1 = res[0].y;
    this.x2 = res[1].x;
    this.y2 = res[1].y;
  }

}
