export const draggableInterface = `
export type Draggable = Positionable & Identifiable;

export interface Positionable {
  position: Point2D
}

export interface Identifiable {
  $gId: string;
}`


export const dragDropComponent = `
@Component({
  imports: [],
  selector: '[input-draggable]',
  templateUrl: './input-draggable.component.svg'
})
export abstract class InputDraggableComponent<T extends Draggable> implements AfterViewInit, OnChanges, OnDestroy {

  @Input()  elem!: T;
  @Output() elemReallyClicked = new EventEmitter<T>();

  elemDragger!: Dragger<T>;

  constructor(
    protected svgAccessService: SVGAccessService
  ) {}

  // dragger that notifies access service about dragging
  private createDragger(elem: T): Dragger<T> {
    return new Dragger<T>(elem, ()=> this.svgAccessService.notifyPositionChange(elem.$gId));
  }

  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elem']) {
      this.elemDragger?.destroy()
      this.elemDragger = this.createDragger(this.elem);
    }
  }

  startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
  }

  /**
   * call this on your template's click binding:
   * just forward click to dragger and only react, if that fires
   * You can add reactions prior to emit via the onClick hook
   */
  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.onClick();
      this.elemReallyClicked.emit(this.elem);
    }
  }

  /**
   * @protected
   * Only adapt this to add a prior reaction to really detected clicks
   */
  protected onClick() {
  }

  ngOnDestroy() {
    this.elemDragger?.destroy();
  }

}
`

export const inputDraggableTemplate = `
<svg:g>
  <g [attr.id]="elem.$gId"
     (mousedown)="startDrag($event)"
     (click)="clickElem($event)">
  </g>
</svg:g>
`

export const exampleDragRect = `
export interface MyPositionable {
  $gId: string;
  position: BoundingBox;
  color: string;
}

@Component({
  selector: '[demo-rect]',
  imports: [RectangleComponent],
  templateUrl: './rect-draggable.component.svg',
  styleUrl: './rect-draggable.component.css'
})
export class RectDraggableComponent extends InputDraggableComponent<MyPositionable> {

  override onClick() {
    this.elem.color = this.randomColor()
  }

  randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

}
// template:
<svg:g rectangleG
       [position]="elem.position"
       [color]="elem.color"
        [attr.id]="elem.$gId"
       (mousedown)="startDrag($event)"
       (click)="clickElem($event)">
</svg:g>
`

export const BindingsForDrag = `  demo0id = 'demo-rect-drag'

  constructor(svgAccessService: SVGAccessService) {
    svgAccessService.positionChange.subscribe(position => {
      if(position == this.demo0id) {
        this.onPositionChangeFormDrag0()
      }
    })
    //also bind form changes to the object:
    this.formDrag0.valueChanges.subscribe(value => {
      this.valueDrag0.position.x = value.x;
      this.valueDrag0.position.y = value.y;
      this.valueDrag0.color = value.color;
    });
  }

  formDrag0: FormGroup = new FormGroup({
    x: new FormControl(0, {nonNullable: true}),
    y: new FormControl(0, {nonNullable: true}),
    color: new FormControl("#000000", {nonNullable: true}),
  })

  valueDrag0 = {
    $gId: this.demo0id,
    color: this.formDrag0.value.color,
    position: {x: this.formDrag0.value.x, y: this.formDrag0.value.y, w: 20, h: 20 }
  }

  onClickFormDrag0() {
    this.formDrag0.patchValue({color: this.valueDrag0.color, x: this.valueDrag0.position.x, y: this.valueDrag0.position.y});
  }

  onPositionChangeFormDrag0() {
    this.formDrag0.patchValue({ x: this.valueDrag0.position.x, y: this.valueDrag0.position.y });
  }
  
  //the click binding is used on the actual template:
      <svg:g>
        <g demo-rect
           [elem]="valueDrag0"
           (elemReallyClicked)="onClickFormDrag0()"
       >
        </g>
    </svg:g>
`

export const dblClick0 = `
    <svg:g demo-preview>
        <g demo-dblclick-rect
           [elem]="valueDblCl"
           [timeout]="formDblClick0.value.timeout"
           (singleClicked)="onSingleClickFormDblClick0()"
           (dblClicked)="onDoubleClickFormDblClick0()"
        >
        </g>
    </svg:g>`