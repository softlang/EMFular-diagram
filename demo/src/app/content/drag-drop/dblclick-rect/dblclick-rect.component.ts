import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {DraggableComponent, RectangleComponent, SingleVsDblClick} from "ngx-emfular-diagram";
import {MyPositionable} from "../rect-draggable/rect-draggable.component";
import {Subscription} from "rxjs";

@Component({
  selector: '[demo-dblclick-rect]',
  imports: [RectangleComponent],
  templateUrl: './dblclick-rect.component.svg',
  styleUrl: './dblclick-rect.component.css'
})
export class DblclickRectComponent extends DraggableComponent<MyPositionable> implements OnChanges, OnDestroy {

  @Input() timeout = 250
  @Output() singleClicked = new EventEmitter<MyPositionable>()
  @Output() dblClicked = new EventEmitter<MyPositionable>()

  whichClick!: SingleVsDblClick
  protected singleClickSubscription?: Subscription;
  protected doubleClickSubscription?: Subscription;

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['elem']||changes['timeout']) {
      this.cleanup()
      this.whichClick = new SingleVsDblClick(this.timeout)
      this.singleClickSubscription = this.whichClick.singleClick$.subscribe(() => this.onSingleClick())
      this.doubleClickSubscription = this.whichClick.doubleClick$.subscribe(() => this.onDoubleClick())
    }
  }

  override onClick() {
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

  protected cleanup() {
    this.singleClickSubscription?.unsubscribe()
    this.doubleClickSubscription?.unsubscribe()
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.cleanup()
  }

}
