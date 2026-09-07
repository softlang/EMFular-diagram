import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {BoundingBox} from "./models/bounding-box";
import {PositionHelper} from "./utils/position-helper";

@Injectable({
  providedIn: 'root'
})
export class SVGAccessService {

  positionChange: Subject<string> = new Subject<string>();

  constructor() { }

  /**
   * Notifies about the given component id and also about all child ids, since they might have moved as well.
   * @param id
   */
  notifyPositionChange(id: string) {
    const elem = document.getElementById(id);
    if (elem) {
      this.positionChange.next(id);
      elem.querySelectorAll('[id]').forEach(child => {
        this.positionChange.next(child.id);
      });
    }
  }

  /**
   * O(1), but no automatic notification of child components
   * use in performance critical settings
   * @param id
   */
  notifyPositionChangeWithoutCascade(id: string) {
    this.positionChange.next(id);
  }

  listenToPositionChange(): Observable<string> {
    return this.positionChange.asObservable()
  }

  getElemById(id: string): SVGGraphicsElement | undefined {
    let elem = document.getElementById(id)
    return elem as unknown as SVGGraphicsElement
  }

  getRelativePosition(id: string, node: SVGGraphicsElement): BoundingBox | undefined {
    let elem = this.getElemById(id)
    if (elem) {
      return PositionHelper.getSvgBBPosition(elem, node)
    }
    return undefined
  }
}
