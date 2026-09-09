import {BoundingBox} from "../../shared/models/bounding-box";
import {Point2D} from "../../shared/models/point2d";

export class PositionHelper {

  static getSvgBBPosition(elem: SVGGraphicsElement, node: SVGGraphicsElement): BoundingBox {
    let abs = PositionHelper.absolutePosition(elem)
    PositionHelper.makeRelativeToElem(abs, node)
    return abs;
  }

  static absolutePosition(elem: SVGGraphicsElement): BoundingBox {
    let relativePosition: DOMRect = elem.getBBox();
    const svg = elem.ownerSVGElement!;
    const toSvg = svg.getScreenCTM()!.inverse();
    const toScreen = elem.getCTM()!
    let translationMatrix: DOMMatrix = toSvg.multiply(toScreen);
    let x = relativePosition.x;
    let y = relativePosition.y;
    let x_abs = translationMatrix.a*x+translationMatrix.c*y+translationMatrix.e;
    let y_abs = translationMatrix.b*x+translationMatrix.d*y+translationMatrix.f;
    return {x: x_abs, y: y_abs, w: relativePosition.width*translationMatrix.a, h: relativePosition.height*translationMatrix.d};
  }

  static makeRelativeToElem(p: Point2D, elem: SVGGraphicsElement): void {
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
