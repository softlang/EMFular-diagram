import {Point} from "@angular/cdk/drag-drop";
import {BoundingBox} from "../models/bounding-box";

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

  static makeRelativeToElem(p: Point, elem: SVGGraphicsElement): void {
    const svg = elem.ownerSVGElement!;
    const fromSvg = svg.getScreenCTM()!;
    const fromScreen = elem.getCTM()!.inverse();
    const transformer = fromScreen.multiply(fromSvg);
    this.matrixTransform(p, transformer);
  }

  static matrixTransform(p: Point, translationMatrix: DOMMatrix): void {
    let x = p.x;
    let y = p.y;
    let x_trans = translationMatrix.a*x+translationMatrix.c*y+translationMatrix.e;
    let y_trans = translationMatrix.b*x+translationMatrix.d*y+translationMatrix.f;
    p.x = x_trans
    p.y = y_trans
  }

  static newBoundingBox(x: number = 0, y: number = 0, width: number = 5, height: number = 5): BoundingBox {
    return {x: x, y: y, w: width, h: height};
  }

  static computeOffset(index: number, length: number): number {
    const middle = (length-1)/2;
    return index - middle;
  }

  static computeChildBBox(index: number, length: number, parentBox: BoundingBox): BoundingBox {
    return {
      x: parentBox.x + this.computeOffset(index, length)*(parentBox.w+5),
      y: parentBox.y+parentBox.h*2,
      w: parentBox.w,
      h: parentBox.h
    }
  }
}
