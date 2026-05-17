import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { Point } from "@angular/cdk/drag-drop";
import { BoundingBox } from "../../../models/bounding-box";
import { PathLayouter } from "../../../utils/path-layouter";
import { ArrowBetweenPointsComponent } from "../arrow-between-points/arrow-between-points.component";
import { ArrowStyleConfiguration } from "../../../models/arrow-style-configuration";
import { ArrowStyleConfigurationService } from "../../../services/arrow-style-configuration.service";
import { v4 as uuidv4 } from "uuid";
import { ArrowDragBase } from "../shared/arrow-drag-base";
import { ArrowGeometry, BoxAnchor } from "../shared/arrow-geometry";
import {
  anchorFromPoint,
  eventToSvgPoint,
  nearestSegmentIndex,
  pointFromAnchor,
} from "../shared/arrow-geometry.util";

export type BentArrowGeometry = ArrowGeometry;

type DragTarget =
  | { kind: "startAnchor" }
  | { kind: "endAnchor" }
  | { kind: "controlPoint"; index: number };

@Component({
  selector: "[arrow-between-boxes]",
  standalone: true,
  templateUrl: "./arrow-between-boxes.component.svg",
  styleUrl: "./arrow-between-boxes.component.css",
  imports: [NgIf, NgFor, ArrowBetweenPointsComponent],
})
export class ArrowBetweenBoxesComponent
  extends ArrowDragBase<DragTarget>
  implements AfterViewInit, OnChanges, OnDestroy
{
  private _start!: BoundingBox;
  @Input() set start(bb: BoundingBox) {
    this._start = bb;
    if (this.positioned) this.computePositions();
  }
  get start(): BoundingBox {
    return this._start;
  }

  private _end!: BoundingBox;
  @Input() set end(bb: BoundingBox) {
    this._end = bb;
    if (this.positioned) this.computePositions();
  }
  get end(): BoundingBox {
    return this._end;
  }

  @Input() arrowType?: string;
  @Input() text?: string;
  @Input() style?: string;

  @Input() bent = false;

  /** Nur für bent=true relevant. */
  @Input() controlPoints: Point[] = [];
  @Input() startAnchor?: BoxAnchor;
  @Input() endAnchor?: BoxAnchor;
  @Input() editable = true;

  @Output() geometryChange = new EventEmitter<BentArrowGeometry>();
  @Output() controlPointsChange = new EventEmitter<Point[]>();
  @Output() startAnchorChange = new EventEmitter<BoxAnchor>();
  @Output() endAnchorChange = new EventEmitter<BoxAnchor>();

  x1 = 0;
  y1 = 0;
  x2 = 5;
  y2 = 5;

  positioned = false;

  readonly id = uuidv4();
  arrowStyleConfiguration: ArrowStyleConfiguration;

  constructor(
    private cdr: ChangeDetectorRef,
    private arrowStyleConfigService: ArrowStyleConfigurationService,
  ) {
    super();
    this.arrowStyleConfiguration = this.arrowStyleConfigService.styleArrow();
  }

  ngOnChanges(): void {
    this.arrowStyleConfiguration = this.arrowStyleConfigService.styleArrow(
      this.arrowType,
    );
    if (this.bent) this.initBentAnchors();
  }

  ngAfterViewInit(): void {
    this.computePositions();
    this.positioned = true;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.removeDragListeners();
  }

  get startPoint(): Point {
    const anchorPoint = pointFromAnchor(this.start, this.startAnchor!);

    if (this.bent && this.controlPoints.length > 0) {
      return this.adjustAnchorIfLineCrossesBox(
        this.start,
        this.controlPoints[0],
        anchorPoint,
      );
    }

    return anchorPoint;
  }

  get endPoint(): Point {
    const anchorPoint = pointFromAnchor(this.end, this.endAnchor!);

    if (this.bent && this.controlPoints.length > 0) {
      return this.adjustAnchorIfLineCrossesBox(
        this.end,
        this.controlPoints[this.controlPoints.length - 1],
        anchorPoint,
      );
    }

    return anchorPoint;
  }

  get pathData(): string {
    if (!this.bent || !this.startAnchor || !this.endAnchor) return "";

    const points = [this.startPoint, ...this.controlPoints, this.endPoint];

    return points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x},${point.y}`)
      .join(" ");
  }

  addControlPoint(event: MouseEvent, emit = true): number | null {
    if (!this.bent || !this.editable) return null;

    event.preventDefault();
    event.stopPropagation();

    const p = eventToSvgPoint(event, this.svgRoot);
    const insertIndex = nearestSegmentIndex(p, [
      this.startPoint,
      ...this.controlPoints,
      this.endPoint,
    ]);

    this.controlPoints = [
      ...this.controlPoints.slice(0, insertIndex),
      p,
      ...this.controlPoints.slice(insertIndex),
    ];

    if (emit) {
      this.emitGeometry();
    }

    return insertIndex;
  }

  addAndDragControlPoint(event: MouseEvent): void {
    const insertedIndex = this.addControlPoint(event, false);

    if (insertedIndex === null) return;

    this.emitGeometry();
    this.startDrag({ kind: "controlPoint", index: insertedIndex }, event);
  }

  removeControlPoint(index: number, event: MouseEvent): void {
    if (!this.bent || !this.editable) return;

    event.stopPropagation();
    this.controlPoints = this.controlPoints.filter((_, i) => i !== index);
    this.emitGeometry();
  }

  startDragControlPoint(index: number, event: MouseEvent): void {
    this.startDrag({ kind: "controlPoint", index }, event);
  }

  startDragStartAnchor(event: MouseEvent): void {
    this.startDrag({ kind: "startAnchor" }, event);
  }

  startDragEndAnchor(event: MouseEvent): void {
    this.startDrag({ kind: "endAnchor" }, event);
  }

  private computePositions(): void {
    const res = PathLayouter.bestPoints(this.start, this.end);
    this.applyBestPoints(res);
    if (this.bent) this.initBentAnchors();
  }

  private applyBestPoints(res: Point[]): void {
    this.x1 = res[0].x;
    this.y1 = res[0].y;
    this.x2 = res[1].x;
    this.y2 = res[1].y;
  }

  private initBentAnchors(): void {
    if (!this.start || !this.end) return;

    const [startPoint, endPoint] = PathLayouter.bestPoints(
      this.start,
      this.end,
    );

    if (!this.startAnchor) {
      this.startAnchor = anchorFromPoint(this.start, startPoint);
    }

    if (!this.endAnchor) {
      this.endAnchor = anchorFromPoint(this.end, endPoint);
    }
  }

  private startDrag(target: DragTarget, event: MouseEvent): void {
    if (!this.bent || !this.editable) return;

    this.beginDrag(target, event);
  }

  protected override onDrag(event: MouseEvent): void {
    if (!this.dragTarget) return;

    const p = eventToSvgPoint(event, this.svgRoot);

    if (this.dragTarget.kind === "controlPoint") {
      const controlPointIndex = this.dragTarget.index;
      this.controlPoints = this.controlPoints.map((point, index) =>
        index === controlPointIndex ? p : point,
      );
    } else if (this.dragTarget.kind === "startAnchor") {
      this.startAnchor = anchorFromPoint(this.start, p);
      this.startAnchorChange.emit(this.startAnchor);
    } else {
      this.endAnchor = anchorFromPoint(this.end, p);
      this.endAnchorChange.emit(this.endAnchor);
    }

    this.emitGeometry();
  }

  protected override onEndDrag(): void {
    this.finishDrag();
  }

  private emitGeometry(): void {
    this.controlPointsChange.emit(this.controlPoints);

    if (this.startAnchor && this.endAnchor) {
      this.geometryChange.emit({
        startAnchor: this.startAnchor,
        endAnchor: this.endAnchor,
        controlPoints: this.controlPoints,
      });
    }
  }

  private adjustAnchorIfLineCrossesBox(
    box: BoundingBox,
    from: Point,
    anchorPoint: Point,
  ): Point {
    const intersections = this.getSegmentBoxIntersections(
      box,
      from,
      anchorPoint,
    );

    if (intersections.length === 0) {
      return anchorPoint;
    }

    const firstIntersection = intersections.sort(
      (a, b) =>
        Math.hypot(a.x - from.x, a.y - from.y) -
        Math.hypot(b.x - from.x, b.y - from.y),
    )[0];

    const distanceToAnchor = Math.hypot(
      firstIntersection.x - anchorPoint.x,
      firstIntersection.y - anchorPoint.y,
    );

    if (distanceToAnchor < 0.5) {
      return anchorPoint;
    }

    return firstIntersection;
  }

  private getSegmentBoxIntersections(
    box: BoundingBox,
    from: Point,
    to: Point,
  ): Point[] {
    const left = box.x;
    const right = box.x + box.w;
    const top = box.y;
    const bottom = box.y + box.h;

    const intersections: Point[] = [];

    this.addLineIntersection(
      intersections,
      from,
      to,
      { x: left, y: top },
      { x: right, y: top },
    );
    this.addLineIntersection(
      intersections,
      from,
      to,
      { x: right, y: top },
      { x: right, y: bottom },
    );
    this.addLineIntersection(
      intersections,
      from,
      to,
      { x: right, y: bottom },
      { x: left, y: bottom },
    );
    this.addLineIntersection(
      intersections,
      from,
      to,
      { x: left, y: bottom },
      { x: left, y: top },
    );

    return intersections;
  }

  private addLineIntersection(
    result: Point[],
    a: Point,
    b: Point,
    c: Point,
    d: Point,
  ): void {
    const denominator = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);

    if (denominator === 0) return;

    const t =
      ((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / denominator;

    const u =
      -((a.x - b.x) * (a.y - c.y) - (a.y - b.y) * (a.x - c.x)) / denominator;

    if (t < 0 || t > 1 || u < 0 || u > 1) return;

    const point = {
      x: a.x + t * (b.x - a.x),
      y: a.y + t * (b.y - a.y),
    };

    const alreadyExists = result.some(
      (p) => Math.hypot(p.x - point.x, p.y - point.y) < 0.5,
    );

    if (!alreadyExists) {
      result.push(point);
    }
  }
}
