export const draggableInterface = `
export type Draggable = Positionable & Identifiable;

export interface Positionable {
  position: BoundingBox
}

export interface Identifiable {
  $gId: string;
}`


export const dragDropComponent = `
import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {SVGAccessService} from '../../services/svg-access.service';
import { Draggable } from '../../models/positionable';
import {Dragger} from "../../models/dragger";

@Component({
  imports: [],
  selector: '[draggable]',
  templateUrl: './draggable.component.svg',
  styleUrl: './draggable.component.css'
})
export abstract class DraggableComponent<T extends Draggable> implements AfterViewInit {

  @Output() chooseElem = new EventEmitter<T>();
  //the caller must initialize both required elements (elem and elementDragger) either in the constructor
  // (or if they are inputs) in the ngOnInit life cycle hook
  elem!: T;
  elemDragger!: Dragger<T>;

  protected constructor(
    protected svgAccessService: SVGAccessService
  ) {}


  ngAfterViewInit() {
    this.svgAccessService.notifyPositionChange(this.elem.$gId)
  }

  startDrag(event: MouseEvent) {
    this.elemDragger.startDrag(event);
  }

  drag(event: MouseEvent) {
    if (this.elemDragger.drag(event)) {
      this.svgAccessService.notifyPositionChange(this.elem.$gId)
    }
  }

  endDrag(event: MouseEvent) {
    this.elemDragger.endDrag(event);
  }

  clickElem(event: MouseEvent) {
    if (this.elemDragger.clickElem(event)) {
      this.chooseElem.emit(this.elem);
    }
  }

}
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
      <svg:g demo-preview>
        <g demo-rect
           [elem]="valueDrag0"
           (chooseElem)="onClickFormDrag0()"
       >
        </g>
    </svg:g>
`