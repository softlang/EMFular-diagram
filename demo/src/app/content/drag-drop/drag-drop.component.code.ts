export const exampleDragRect = `export interface MyPositionable {
  $gId: string;
  position: BoundingBox;
  color: string;
}

@Component({
  selector: '[demo-rect]',
  imports: [RectangleComponent, DraggableDirective],
  templateUrl: './rect-draggable.component.svg',
  styleUrl: './rect-draggable.component.css'
})
export class RectDraggableComponent {

  @Input() elem!: MyPositionable;

  onRealClick() {
    this.elem.color = this.randomColor()
  }

  private randomColor() {
    return'#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

}
// template:
<svg:g rectangleG
       [position]="elem.position"
       [dragPosition]="elem.position"
       [color]="elem.color"
       [attr.id]="elem.$gId"
       (elemReallyClicked)="onRealClick()"
>
</svg:g>`

export const BindingsForDrag = `demo0id = 'demo-rect-drag'

  constructor(svgPositionChangeService: SvgPositionChangeService) {
    svgPositionChangeService.positionChange.subscribe(position => {
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
           (click)="onClickFormDrag0()"
       >
        </g>
    </svg:g>
`

export const dblClick0 = `<svg:g demo-preview>
   <g demo-dblclick-rect
        [elem]="valueDblCl"
        [timeout]="formDblClick0.value.timeout"
        (singleClicked)="onSingleClickFormDblClick0()"
        (dblClicked)="onDoubleClickFormDblClick0()"
   >
   </g>
</svg:g>`
