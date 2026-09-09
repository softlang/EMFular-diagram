import {BoundingBox} from "../../shared/models/bounding-box";
import {Point2D} from "../../shared/models/point2d";

export class PositionHelper {

  static getRelativeBBox(elem: SVGGraphicsElement, relativeTo: SVGGraphicsElement): BoundingBox {
    let absBox = PositionHelper.absoluteBBox(elem)
    PositionHelper.makePointRelativeToElem(absBox, relativeTo)
    return absBox;
  }

  static absoluteBBox(elem: SVGGraphicsElement): BoundingBox {
    const relativePosition: DOMRect = elem.getBBox();
    const svg = elem.ownerSVGElement!;
    const toSvg = svg.getScreenCTM()!.inverse();
    const toScreen = elem.getCTM()!
    const translationMatrix: DOMMatrix = toSvg.multiply(toScreen);
    const x = relativePosition.x;
    const y = relativePosition.y;
    const x_abs = translationMatrix.a*x+translationMatrix.c*y+translationMatrix.e;
    const y_abs = translationMatrix.b*x+translationMatrix.d*y+translationMatrix.f;
    return {x: x_abs, y: y_abs, w: relativePosition.width*translationMatrix.a, h: relativePosition.height*translationMatrix.d};
  }

  static makePointRelativeToElem(p: Point2D, elem: SVGGraphicsElement): void {
    const svg = elem.ownerSVGElement!;
    const fromSvg = svg.getScreenCTM()!;
    const fromScreen = elem.getCTM()!.inverse();
    const transformer = fromScreen.multiply(fromSvg);
    this.matrixTransform(p, transformer);
  }

  static matrixTransform(p: Point2D, translationMatrix: DOMMatrix): void {
    let x = p.x;
    let y = p.y;
    let x_trans = translationMatrix.a*x+translationMatrix.c*y+translationMatrix.e;
    let y_trans = translationMatrix.b*x+translationMatrix.d*y+translationMatrix.f;
    p.x = x_trans
    p.y = y_trans
  }
}
