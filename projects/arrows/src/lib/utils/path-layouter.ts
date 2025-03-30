import {BoundingBox} from "../models/bounding-box";
import {Point} from "@angular/cdk/drag-drop";

export class PathLayouter {

  static bestPoints(p1: BoundingBox, p2: BoundingBox) {
    //assumption is that both boxes do not intersect
    //since we only deal with bounding boxes, all relevant lines are parallel/orthogonal

    let xPoints = this.getPointsInOneDimension(p1.x, p1.w, p2.x, p2.w)
    let yPoints = this.getPointsInOneDimension(p1.y, p1.h, p2.y, p2.h)
    let result1: Point = {x: xPoints[0], y: yPoints[0]}
    let result2: Point = {x: xPoints[1], y: yPoints[1]}
    return [result1, result2];
  }

  // assumes that x1 is smaller than x2
  //works for width (careful with height, y axis is wrong way)
  static determineOverlapX(x1: number, w1: number, x2: number, w2: number): number[] {
    let x1right = x1+w1
    if (x1right >= x2) {
      //find end of overlap
      let x2right = x2+w2
      let end = Math.min(x1right, x2right)
      //overlap interval is [x2, end]
      let middle = (x2+end)/2
      return [middle, middle]
    } else return [x1right, x2]
  }


  static getPointsInOneDimension(x1: number, w1: number, x2: number, w2: number): number[] {
    //determine overlap (and then middle of it) or closest points in one dimension
    if (x1 < x2) {
      return this.determineOverlapX(x1, w1, x2, w2)
    } else {
      return this.determineOverlapX(x2, w2, x1, w1).reverse()
    }
  }

}
