import {
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
import { ArrowStyleConfiguration } from "../../../models/arrow-style-configuration";
import { ArrowStyleConfigurationService } from "../../../services/arrow-style-configuration.service";
import { v4 as uuidv4 } from "uuid";
import { ArrowDragBase } from "../shared/arrow-drag-base";
import { ArrowGeometry, BoxAnchor } from "../shared/arrow-geometry";
import {
  anchorFromPoint,
  distanceToSegment,
  eventToSvgPoint,
  nearestSegmentIndex,
  pointFromAnchor,
} from "../shared/arrow-geometry.util";

export type OrthogonalArrowGeometry = ArrowGeometry;

export type DragTarget =
  | { kind: "startAnchor" }
  | { kind: "endAnchor" }
  | { kind: "controlPoint"; index: number }
  | {
      kind: "segmentMove";
      segmentIndex: number;
      orientation: "horizontal" | "vertical";
      route: Point[];
    };

export interface RoutedHandle {
  point: Point;
  controlPointIndex?: number;
  cornerSegmentIndex?: number;
}

@Component({
  selector: "[orthogonal-arrow-between-boxes]",
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: "./orthogonal-arrow-between-boxes.component.svg",
  styleUrl: "./orthogonal-arrow-between-boxes.component.css",
})
export class OrthogonalArrowBetweenBoxesComponent
  extends ArrowDragBase<DragTarget>
  implements OnChanges, OnDestroy
{
  @Input({ required: true }) start!: BoundingBox;
  @Input({ required: true }) end!: BoundingBox;

  @Input() controlPoints: Point[] = [];
  @Input() startAnchor?: BoxAnchor;
  @Input() endAnchor?: BoxAnchor;

  @Input() editable = true;
  @Input() text?: string;
  @Input() style?: string;
  @Input() arrowType?: string;

  @Output() geometryChange = new EventEmitter<OrthogonalArrowGeometry>();
  @Output() controlPointsChange = new EventEmitter<Point[]>();
  @Output() startAnchorChange = new EventEmitter<BoxAnchor>();
  @Output() endAnchorChange = new EventEmitter<BoxAnchor>();

  readonly id = uuidv4();
  arrowStyleConfiguration: ArrowStyleConfiguration;

  private readonly alignmentEpsilon = 0.5;
  private readonly redundantLineEpsilon = 2;
  private readonly mergePointEpsilon = 8;

  constructor(private arrowStyleConfigService: ArrowStyleConfigurationService) {
    super();
    this.arrowStyleConfiguration = this.arrowStyleConfigService.styleArrow();
  }

  ngOnChanges(): void {
    this.arrowStyleConfiguration = this.arrowStyleConfigService.styleArrow(
      this.arrowType,
    );

    this.updateAnchorsFromRoute();
    this.controlPoints = this.normalizeControlPoints(
      this.controlPoints,
      this.startPoint,
      this.endPoint,
    );
    this.updateAnchorsFromRoute();
  }

  ngOnDestroy(): void {
    this.removeDragListeners();
  }

  get startPoint(): Point {
    if (this.startAnchor) {
      return pointFromAnchor(this.start, this.startAnchor);
    }

    const nextPoint = this.controlPoints[0] ?? this.endCenterPoint;
    return this.closestPointOnBox(this.start, nextPoint);
  }

  get endPoint(): Point {
    if (this.endAnchor) {
      return pointFromAnchor(this.end, this.endAnchor);
    }

    const previousPoint =
      this.controlPoints[this.controlPoints.length - 1] ??
      this.startCenterPoint;

    return this.closestPointOnBox(this.end, previousPoint);
  }

  private get startCenterPoint(): Point {
    return {
      x: this.start.x + this.start.w / 2,
      y: this.start.y + this.start.h / 2,
    };
  }

  private get endCenterPoint(): Point {
    return {
      x: this.end.x + this.end.w / 2,
      y: this.end.y + this.end.h / 2,
    };
  }

  get allPoints(): Point[] {
    return [this.startPoint, ...this.controlPoints, this.endPoint];
  }

  get pathData(): string {
    const points = this.routedPoints;

    if (points.length < 2) {
      return "";
    }

    const path: string[] = [`M ${points[0].x},${points[0].y}`];

    for (let i = 1; i < points.length; i++) {
      path.push(`L ${points[i].x},${points[i].y}`);
    }

    return path.join(" ");
  }

  get routedPoints(): Point[] {
    const basePoints = [this.startPoint, ...this.controlPoints, this.endPoint];

    if (basePoints.length < 2) {
      return basePoints;
    }

    const routed: Point[] = [basePoints[0]];

    for (let i = 1; i < basePoints.length; i++) {
      const previous = routed[routed.length - 1];
      const current = basePoints[i];

      if (previous.x !== current.x && previous.y !== current.y) {
        routed.push({
          x: current.x,
          y: previous.y,
        });
      }

      routed.push(current);
    }

    return routed;
  }

  get routedHandles(): RoutedHandle[] {
    const basePoints = this.allPoints;
    const handles: RoutedHandle[] = [];

    for (let i = 1; i < basePoints.length - 1; i++) {
      handles.push({
        point: basePoints[i],
        controlPointIndex: i - 1,
      });
    }

    for (let i = 0; i < basePoints.length - 1; i++) {
      const previous = basePoints[i];
      const current = basePoints[i + 1];

      if (!this.isOrthogonal(previous, current)) {
        handles.push({
          point: { x: current.x, y: previous.y },
          cornerSegmentIndex: i,
        });
      }
    }

    return this.deduplicateHandles(handles);
  }

  addControlPoint(event: MouseEvent): void {
    if (!this.editable) return;

    event.preventDefault();
    event.stopPropagation();

    const clickedPoint = eventToSvgPoint(event, this.svgRoot);
    const segmentIndex = nearestSegmentIndex(clickedPoint, this.allPoints);
    const points = this.allPoints;

    const segmentStart = points[segmentIndex];
    const segmentEnd = points[segmentIndex + 1];

    const isHorizontal =
      Math.abs(segmentEnd.x - segmentStart.x) >=
      Math.abs(segmentEnd.y - segmentStart.y);

    const bendOffset = 40;

    const insertedPoints: Point[] = isHorizontal
      ? [
          { x: clickedPoint.x, y: segmentStart.y },
          { x: clickedPoint.x, y: segmentStart.y + bendOffset },
          { x: segmentEnd.x, y: segmentStart.y + bendOffset },
        ]
      : [
          { x: segmentStart.x, y: clickedPoint.y },
          { x: segmentStart.x + bendOffset, y: clickedPoint.y },
          { x: segmentStart.x + bendOffset, y: segmentEnd.y },
        ];

    this.insertControlPoints(segmentIndex, insertedPoints);
    this.controlPoints = this.normalizeControlPoints(this.controlPoints);
    this.updateAnchorsFromRoute();
    this.emitGeometry();
  }

  startDragSegment(event: MouseEvent): void {
    if (!this.editable) return;

    event.preventDefault();
    event.stopPropagation();

    const clickedPoint = eventToSvgPoint(event, this.svgRoot);
    const points = this.routedPoints;
    const segmentIndex = this.findNearestDraggableSegmentIndex(
      clickedPoint,
      points,
    );

    if (segmentIndex === -1) return;

    const segmentStart = points[segmentIndex];
    const segmentEnd = points[segmentIndex + 1];

    if (!segmentStart || !segmentEnd) return;

    this.startDrag(
      {
        kind: "segmentMove",
        segmentIndex,
        orientation: this.getSegmentOrientation(segmentStart, segmentEnd),
        route: points,
      },
      event,
    );
  }

  removeControlPoint(index: number, event: MouseEvent): void {
    if (!this.editable) return;

    event.stopPropagation();

    this.controlPoints = this.normalizeControlPoints(
      this.controlPoints.filter((_, i) => i !== index),
    );
    this.updateAnchorsFromRoute();

    this.emitGeometry();
  }

  startDragControlPoint(index: number, event: MouseEvent): void {
    this.startDrag({ kind: "controlPoint", index }, event);
  }

  startDragRoutedHandle(handle: RoutedHandle, event: MouseEvent): void {
    if (handle.controlPointIndex !== undefined) {
      this.startDragControlPoint(handle.controlPointIndex, event);
      return;
    }

    if (handle.cornerSegmentIndex === undefined) return;

    const insertedControlPointIndex = this.insertCornerControlPoint(
      handle.cornerSegmentIndex,
    );

    if (insertedControlPointIndex !== -1) {
      this.startDragControlPoint(insertedControlPointIndex, event);
    }
  }

  startDragStartAnchor(event: MouseEvent): void {
    this.startDrag({ kind: "startAnchor" }, event);
  }

  startDragEndAnchor(event: MouseEvent): void {
    this.startDrag({ kind: "endAnchor" }, event);
  }

  private startDrag(target: DragTarget, event: MouseEvent): void {
    if (!this.editable) return;

    this.beginDrag(target, event);
  }

  protected override onDrag(event: MouseEvent): void {
    if (!this.dragTarget) return;

    const p = eventToSvgPoint(event, this.svgRoot);

    if (this.dragTarget.kind === "controlPoint") {
      this.dragControlPoint(this.dragTarget.index, p);
    } else if (this.dragTarget.kind === "segmentMove") {
      this.dragRoutedSegment(this.dragTarget, p);
    } else if (this.dragTarget.kind === "startAnchor") {
      this.startAnchor = anchorFromPoint(this.start, p);
    } else {
      this.endAnchor = anchorFromPoint(this.end, p);
    }
  }

  private dragControlPoint(index: number, point: Point): void {
    const updated = [...this.controlPoints];

    updated[index] = {
      x: point.x,
      y: point.y,
    };

    this.controlPoints = updated;
  }

  private dragRoutedSegment(
    target: Extract<DragTarget, { kind: "segmentMove" }>,
    point: Point,
  ): void {
    const route = target.route;
    const segmentStart = route[target.segmentIndex];
    const segmentEnd = route[target.segmentIndex + 1];

    if (!segmentStart || !segmentEnd) return;

    const orientation = target.orientation;
    const movedCoordinate = orientation === "horizontal" ? point.y : point.x;
    const lastPointIndex = route.length - 1;

    const isSameRunSegment = (index: number): boolean => {
      const start = route[index];
      const end = route[index + 1];

      if (!start || !end) return false;

      if (orientation === "horizontal") {
        return this.sameCoordinate(start.y, end.y);
      }

      return this.sameCoordinate(start.x, end.x);
    };

    const segmentCoordinate =
      orientation === "horizontal" ? segmentStart.y : segmentStart.x;

    const hasSameRunCoordinate = (index: number): boolean => {
      const start = route[index];
      const end = route[index + 1];

      if (!start || !end) return false;

      const coordinate = orientation === "horizontal" ? start.y : start.x;

      return (
        isSameRunSegment(index) &&
        this.sameCoordinate(coordinate, segmentCoordinate)
      );
    };

    let runStartSegmentIndex = target.segmentIndex;
    let runEndSegmentIndex = target.segmentIndex;

    while (
      runStartSegmentIndex > 0 &&
      hasSameRunCoordinate(runStartSegmentIndex - 1)
    ) {
      runStartSegmentIndex--;
    }

    while (
      runEndSegmentIndex < route.length - 2 &&
      hasSameRunCoordinate(runEndSegmentIndex + 1)
    ) {
      runEndSegmentIndex++;
    }

    const runStartPointIndex = runStartSegmentIndex;
    const runEndPointIndex = runEndSegmentIndex + 1;

    const movePoint = (p: Point): Point =>
      orientation === "horizontal"
        ? { x: p.x, y: movedCoordinate }
        : { x: movedCoordinate, y: p.y };

    const updatedRoute: Point[] = [];

    for (let i = 0; i < route.length; i++) {
      const isRunPoint = i >= runStartPointIndex && i <= runEndPointIndex;

      if (!isRunPoint) {
        updatedRoute.push(route[i]);
        continue;
      }

      const movedPoint = movePoint(route[i]);

      if (i === 0 || i === lastPointIndex) {
        updatedRoute.push(route[i]);

        if (!this.samePoint(route[i], movedPoint)) {
          updatedRoute.push(movedPoint);
        }
      } else {
        updatedRoute.push(movedPoint);
      }
    }

    this.controlPoints = this.routeToControlPoints(updatedRoute);
  }

  private findNearestDraggableSegmentIndex(
    point: Point,
    points: Point[],
  ): number {
    let nearestIndex = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < points.length - 1; index++) {
      const start = points[index];
      const end = points[index + 1];

      if (!start || !end || this.samePoint(start, end)) {
        continue;
      }

      const distance = distanceToSegment(point, start, end);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    }

    return nearestIndex;
  }

  private routeToControlPoints(route: Point[]): Point[] {
    const cleaned = this.simplifyRoute(route);
    return cleaned.slice(1, -1);
  }

  private simplifyRoute(route: Point[]): Point[] {
    let simplified = this.mergeConsecutiveDuplicates(route);

    let changed = true;
    while (changed) {
      changed = false;
      const next: Point[] = [];

      for (let i = 0; i < simplified.length; i++) {
        const previous = next[next.length - 1];
        const current = simplified[i];
        const following = simplified[i + 1];

        if (
          previous &&
          following &&
          this.isCollinear(previous, current, following)
        ) {
          changed = true;
          continue;
        }

        next.push(current);
      }

      simplified = this.mergeConsecutiveDuplicates(next);
    }

    return simplified;
  }

  private isCollinear(a: Point, b: Point, c: Point): boolean {
    return (
      (this.sameCoordinate(a.x, b.x) && this.sameCoordinate(b.x, c.x)) ||
      (this.sameCoordinate(a.y, b.y) && this.sameCoordinate(b.y, c.y))
    );
  }

  protected override onEndDrag(): void {
    const finishedTarget = this.dragTarget;

    this.dragTarget = undefined;
    this.svgRoot = undefined;

    const fixedStartPoint = this.startPoint;
    const fixedEndPoint = this.endPoint;

    this.controlPoints = this.routeToControlPoints(this.routedPoints);
    this.controlPoints = this.normalizeControlPoints(
      this.controlPoints,
      fixedStartPoint,
      fixedEndPoint,
    );

    if (finishedTarget?.kind !== "segmentMove") {
      this.updateAnchorsFromRoute();
    }

    this.emitGeometry();
    this.removeDragListeners();
  }

  private emitGeometry(): void {
    this.controlPointsChange.emit(this.controlPoints);

    if (this.startAnchor) {
      this.startAnchorChange.emit(this.startAnchor);
    }

    if (this.endAnchor) {
      this.endAnchorChange.emit(this.endAnchor);
    }

    if (this.startAnchor && this.endAnchor) {
      this.geometryChange.emit({
        startAnchor: this.startAnchor,
        endAnchor: this.endAnchor,
        controlPoints: this.controlPoints,
      });
    }
  }

  private insertControlPoints(
    afterSegmentIndex: number,
    points: Point[],
  ): void {
    this.controlPoints = [
      ...this.controlPoints.slice(0, afterSegmentIndex),
      ...points,
      ...this.controlPoints.slice(afterSegmentIndex),
    ];
  }

  private insertCornerControlPoint(segmentIndex: number): number {
    const points = this.allPoints;

    const previous = points[segmentIndex];
    const current = points[segmentIndex + 1];

    if (!previous || !current || this.isOrthogonal(previous, current)) {
      return -1;
    }

    const corner: Point = {
      x: current.x,
      y: previous.y,
    };

    this.controlPoints = [
      ...this.controlPoints.slice(0, segmentIndex),
      corner,
      ...this.controlPoints.slice(segmentIndex),
    ];

    this.updateAnchorsFromRoute();

    return segmentIndex;
  }

  private updateAnchorsFromRoute(): void {
    const startTarget = this.controlPoints[0] ?? this.endPoint;
    const endTarget =
      this.controlPoints[this.controlPoints.length - 1] ?? this.startPoint;

    this.startAnchor = anchorFromPoint(
      this.start,
      this.closestPointOnBox(this.start, startTarget),
    );
    this.endAnchor = anchorFromPoint(
      this.end,
      this.closestPointOnBox(this.end, endTarget),
    );
  }

  private normalizeControlPoints(
    points: Point[],
    boundaryStart: Point = this.startPoint,
    boundaryEnd: Point = this.endPoint,
  ): Point[] {
    let normalized = this.mergeConsecutiveDuplicates(points);

    let changed = true;
    while (changed) {
      changed = false;
      const base = [boundaryStart, ...normalized, boundaryEnd];
      const next: Point[] = [];

      for (let i = 1; i < base.length - 1; i++) {
        const current = base[i];

        if (this.isPointRedundant(base[i - 1], current, base[i + 1])) {
          changed = true;
          continue;
        }

        next.push(current);
      }

      normalized = this.mergeConsecutiveDuplicates(next);
    }

    return normalized;
  }

  private mergeConsecutiveDuplicates(points: Point[]): Point[] {
    return points.reduce<Point[]>((result, point) => {
      const previous = result[result.length - 1];

      if (
        !previous ||
        !this.samePoint(previous, point, this.mergePointEpsilon)
      ) {
        result.push(point);
      }

      return result;
    }, []);
  }

  private isPointRedundant(
    previous: Point,
    current: Point,
    next: Point,
  ): boolean {
    return (
      this.samePoint(previous, current, this.mergePointEpsilon) ||
      this.samePoint(current, next, this.mergePointEpsilon) ||
      this.isRedundantHorizontalPoint(previous, current, next) ||
      this.isRedundantVerticalPoint(previous, current, next)
    );
  }

  private isRedundantHorizontalPoint(
    previous: Point,
    current: Point,
    next: Point,
  ): boolean {
    return (
      this.sameCoordinate(previous.y, current.y, this.redundantLineEpsilon) &&
      this.sameCoordinate(current.y, next.y, this.redundantLineEpsilon) &&
      this.isBetween(current.x, previous.x, next.x, this.mergePointEpsilon)
    );
  }

  private isRedundantVerticalPoint(
    previous: Point,
    current: Point,
    next: Point,
  ): boolean {
    return (
      this.sameCoordinate(previous.x, current.x, this.redundantLineEpsilon) &&
      this.sameCoordinate(current.x, next.x, this.redundantLineEpsilon) &&
      this.isBetween(current.y, previous.y, next.y, this.mergePointEpsilon)
    );
  }

  private isBetween(
    value: number,
    boundaryA: number,
    boundaryB: number,
    tolerance = this.alignmentEpsilon,
  ): boolean {
    return (
      value >= Math.min(boundaryA, boundaryB) - tolerance &&
      value <= Math.max(boundaryA, boundaryB) + tolerance
    );
  }

  private deduplicateHandles(handles: RoutedHandle[]): RoutedHandle[] {
    return handles.reduce<RoutedHandle[]>((result, handle) => {
      const existing = result.find((entry) =>
        this.samePoint(entry.point, handle.point),
      );

      if (!existing) {
        result.push(handle);
      } else if (
        existing.controlPointIndex === undefined &&
        handle.controlPointIndex !== undefined
      ) {
        existing.controlPointIndex = handle.controlPointIndex;
        existing.cornerSegmentIndex = undefined;
      }

      return result;
    }, []);
  }

  private isOrthogonal(a: Point, b: Point): boolean {
    return this.sameCoordinate(a.x, b.x) || this.sameCoordinate(a.y, b.y);
  }

  private samePoint(
    a: Point,
    b: Point,
    tolerance = this.alignmentEpsilon,
  ): boolean {
    return (
      this.sameCoordinate(a.x, b.x, tolerance) &&
      this.sameCoordinate(a.y, b.y, tolerance)
    );
  }

  private sameCoordinate(
    a: number,
    b: number,
    tolerance = this.alignmentEpsilon,
  ): boolean {
    return Math.abs(a - b) <= tolerance;
  }

  private getSegmentOrientation(
    start: Point,
    end: Point,
  ): "horizontal" | "vertical" {
    return Math.abs(end.x - start.x) >= Math.abs(end.y - start.y)
      ? "horizontal"
      : "vertical";
  }

  private closestPointOnBox(box: BoundingBox, point: Point): Point {
    const clampedX = this.clampToRange(point.x, box.x, box.x + box.w);
    const clampedY = this.clampToRange(point.y, box.y, box.y + box.h);

    const candidates: Point[] = [
      { x: clampedX, y: box.y },
      { x: box.x + box.w, y: clampedY },
      { x: clampedX, y: box.y + box.h },
      { x: box.x, y: clampedY },
    ];

    return candidates.reduce((best, candidate) =>
      this.distance(candidate, point) < this.distance(best, point)
        ? candidate
        : best,
    );
  }

  private clampToRange(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
}
