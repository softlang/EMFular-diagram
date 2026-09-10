import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable()
export class SvgPositionChangeService {

  private readonly positionChangeSubject = new Subject<string>();
  readonly positionChange: Observable<string> = this.positionChangeSubject.asObservable();

  /**
   * Notifies about the given component id and also about all child ids, since they might have moved as well.
   * @param id
   */
  notifyPositionChange(id: string) {
    const elem = document.getElementById(id);
    if (elem) {
      this.positionChangeSubject.next(id);
      elem.querySelectorAll('[id]').forEach(child => {
        this.positionChangeSubject.next(child.id);
      });
    }
  }

  /**
   * O(1), but no automatic notification of child components
   * use in performance critical settings
   * @param id
   */
  notifyPositionChangeWithoutCascade(id: string) {
    this.positionChangeSubject.next(id);
  }

}
