import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableComponent } from './draggable.component';
import {Draggable} from "@app/core/features/positionable/positionable";
import {SVGAccessService} from "ngx-arrows";

describe('DraggableComponent', () => {
  let example = {gId: "id", position: { x: 1, y: 2, w: 2, h: 1 }};
  let component: DraggableComponent<Draggable>;
  let fixture: ComponentFixture<DraggableComponent<Draggable>>;

  class DraggableTestComponent<T extends Draggable> extends DraggableComponent<T> {
    constructor(svgAccessService: SVGAccessService) {
      super(svgAccessService);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableTestComponent<Draggable>);
    component = fixture.componentInstance;
    component.elem = example;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
