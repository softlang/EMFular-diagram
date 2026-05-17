import { Point } from "@angular/cdk/drag-drop";

export type BoxSide = "top" | "right" | "bottom" | "left";

export interface BoxAnchor {
  side: BoxSide;
  offset: number;
}

export interface ArrowGeometry {
  startAnchor: BoxAnchor;
  endAnchor: BoxAnchor;
  controlPoints: Point[];
}
