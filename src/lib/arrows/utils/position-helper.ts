import {BoundingBox} from "../../shared/models/bounding-box";
import {Point2D} from "../../shared/models/point2d";

export class PositionHelper {

  static getRelativeBBox(elem: SVGGraphicsElement, relativeTo: SVGGraphicsElement): BoundingBox {
    const absBox = PositionHelper.absoluteBBox(elem)
    return {
      ...absBox,
      ...PositionHelper.makePointRelativeToElem(absBox, relativeTo)
    }
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

  static makePointRelativeToElem(p: Point2D, elem: SVGGraphicsElement): Point2D {
    const svg = elem.ownerSVGElement!;
    const fromSvg = svg.getScreenCTM()!;
    const fromScreen = elem.getCTM()!.inverse();
    const transformer = fromScreen.multiply(fromSvg);
    return this.matrixTransform(p, transformer);
  }

  static matrixTransform(p: Point2D, translationMatrix: DOMMatrix): Point2D {
    const x_trans = translationMatrix.a*p.x+translationMatrix.c*p.y+translationMatrix.e;
    const y_trans = translationMatrix.b*p.x+translationMatrix.d*p.y+translationMatrix.f;
    return {x: x_trans, y: y_trans};
  }
}
