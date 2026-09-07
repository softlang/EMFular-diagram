import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {DraggableDirective, RectangleComponent, SingleVsDblClick} from "ngx-emfular-diagram";
import {MyPositionable} from "../rect-draggable/rect-draggable.component";
import {Subscription} from "rxjs";

@Component({
  selector: '[demo-dblclick-rect]',
  imports: [RectangleComponent, DraggableDirective],
  templateUrl: './dblclick-rect.component.svg',
  styleUrl: './dblclick-rect.component.css'
})
export class DblclickRectComponent implements OnChanges, OnDestroy {

  @Input() elem!: MyPositionable
  @Input() timeout = 250
  @Output() singleClicked = new EventEmitter<MyPositionable>()
  @Output() dblClicked = new EventEmitter<MyPositionable>()

  whichClick!: SingleVsDblClick
  private singleClickSubscription?: Subscription;
  private doubleClickSubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elem']||changes['timeout']) {
      this.cleanup()
      this.whichClick = new SingleVsDblClick(this.timeout)
      this.singleClickSubscription = this.whichClick.singleClick$.subscribe(() => this.onSingleClick())
      this.doubleClickSubscription = this.whichClick.doubleClick$.subscribe(() => this.onDoubleClick())
    }
  }

  onClick() {
    this.whichClick.click()
  }

  onSingleClick() {
    this.elem.color = this.randomColor()
    this.singleClicked.emit(this.elem)
  }

  private randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  onDoubleClick() {
    this.changeOrientation()
    this.dblClicked.emit(this.elem)
  }

  private changeOrientation() {
    const w = this.elem.position.w
    this.elem.position.w = this.elem.position.h
    this.elem.position.h = w
  }

  private cleanup() {
    this.singleClickSubscription?.unsubscribe()
    this.doubleClickSubscription?.unsubscribe()
  }

  ngOnDestroy() {
    this.cleanup()
  }

}
