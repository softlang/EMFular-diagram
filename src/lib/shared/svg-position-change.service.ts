import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SvgPositionChangeService {

  positionChange: Subject<string> = new Subject<string>();

  constructor() { }

  listenToPositionChange(): Observable<string> {
    return this.positionChange.asObservable()
  }

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

}
