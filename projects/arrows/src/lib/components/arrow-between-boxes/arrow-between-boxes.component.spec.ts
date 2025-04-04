import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArrowBetweenBoxesComponent} from './arrow-between-boxes.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {BoundingBox} from "../../models/bounding-box";

describe('ArrowBetweenBoxesComponent', () => {
  let component: ArrowBetweenBoxesComponent;
  let fixture: ComponentFixture<ArrowBetweenBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ArrowBetweenBoxesComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
    .compileComponents();

    let start: BoundingBox = {x: 50, y: -20, w: 200, h: 80}
    let end: BoundingBox = {x: 80, y: 20, w: 100, h: 200}

    fixture = TestBed.createComponent(ArrowBetweenBoxesComponent);
    component = fixture.componentInstance;
    component.start = start
    component.end = end
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
