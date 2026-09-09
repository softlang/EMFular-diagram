import {BoundingBox, newBoundingBox} from "../../shared/models/bounding-box";
import {Point2D} from "../../shared/models/point2d";

export class PositionHelper {
  static getRelativeBBox(elem: SVGGraphicsElement, relativeTo: SVGGraphicsElement): BoundingBox {
    const domRect = elem.getBBox();
    const bbox = newBoundingBox(domRect.x, domRect.y, domRect.width, domRect.height);
    const transformer = relativeTo.getCTM()!.inverse().multiply(elem.getCTM()!);
    return PositionHelper.transformBBox(bbox, transformer);
  }

  static transformBBox(box: BoundingBox, matrix: DOMMatrix): BoundingBox {
    //transform all four corners:
    const points = [
      PositionHelper.matrixTransform({x: box.x, y: box.y}, matrix),
      PositionHelper.matrixTransform({x: box.x + box.w, y: box.y}, matrix),
      PositionHelper.matrixTransform({x: box.x, y: box.y + box.h}, matrix),
      PositionHelper.matrixTransform({x: box.x + box.w, y: box.y + box.h}, matrix)
    ];
    //compute new min and max values:
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    return newBoundingBox(minX, minY, maxX - minX, maxY - minY);
  }

  static matrixTransform(p: Point2D, matrix: DOMMatrix): Point2D {
    const x = matrix.a * p.x + matrix.c * p.y + matrix.e;
    const y = matrix.b * p.x + matrix.d * p.y + matrix.f;
    return {x, y};
  }
}