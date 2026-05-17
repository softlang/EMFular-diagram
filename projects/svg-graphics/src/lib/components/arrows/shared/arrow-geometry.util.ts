import { Point } from "@angular/cdk/drag-drop";
import { BoundingBox } from "../../../models/bounding-box";
import { BoxAnchor, BoxSide } from "./arrow-geometry";

export function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function pointFromAnchor(box: BoundingBox, anchor: BoxAnchor): Point {
  const offset = clamp(anchor.offset);

  switch (anchor.side) {
    case "top":
      return { x: box.x + box.w * offset, y: box.y };
    case "right":
      return { x: box.x + box.w, y: box.y + box.h * offset };
    case "bottom":
      return { x: box.x + box.w * offset, y: box.y + box.h };
    case "left":
      return { x: box.x, y: box.y + box.h * offset };
  }
}

export function anchorFromPoint(box: BoundingBox, point: Point): BoxAnchor {
  const distances = [
    { side: "top" as BoxSide, value: Math.abs(point.y - box.y) },
    { side: "right" as BoxSide, value: Math.abs(point.x - (box.x + box.w)) },
    { side: "bottom" as BoxSide, value: Math.abs(point.y - (box.y + box.h)) },
    { side: "left" as BoxSide, value: Math.abs(point.x - box.x) },
  ].sort((a, b) => a.value - b.value);

  const side = distances[0].side;
  const offset =
    side === "top" || side === "bottom"
      ? (point.x - box.x) / box.w
      : (point.y - box.y) / box.h;

  return { side, offset: clamp(offset) };
}

export function eventToSvgPoint(
  event: MouseEvent,
  svgRoot?: SVGSVGElement,
): Point {
  const svg =
    svgRoot ??
    (event.currentTarget as SVGElement).ownerSVGElement ??
    document.querySelector("svg");

  if (!svg || !svg.getScreenCTM()) {
    return { x: event.clientX, y: event.clientY };
  }

  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;

  const transformed = point.matrixTransform(svg.getScreenCTM()!.inverse());

  return { x: transformed.x, y: transformed.y };
}

export function distanceToSegment(point: Point, start: Point, end: Point): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (dx === 0 && dy === 0) {
    return Math.hypot(point.x - start.x, point.y - start.y);
  }

  const t = Math.max(
    0,
    Math.min(
      1,
      ((point.x - start.x) * dx + (point.y - start.y) * dy) /
        (dx * dx + dy * dy),
    ),
  );

  const closestPoint = {
    x: start.x + t * dx,
    y: start.y + t * dy,
  };

  return Math.hypot(point.x - closestPoint.x, point.y - closestPoint.y);
}

export function nearestSegmentIndex(point: Point, points: Point[]): number {
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < points.length - 1; index++) {
    const distance = distanceToSegment(point, points[index], points[index + 1]);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  }

  return nearestIndex;
}
