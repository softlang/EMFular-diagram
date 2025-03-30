import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArrowSvgComponent} from './arrow-svg.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {BoundingBox} from "../../models/bounding-box";

describe('ArrowSvgComponent', () => {
  let component: ArrowSvgComponent;
  let fixture: ComponentFixture<ArrowSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ArrowSvgComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
    .compileComponents();

    let start: BoundingBox = {x: 50, y: -20, w: 200, h: 80}
    let end: BoundingBox = {x: 80, y: 20, w: 100, h: 200}

    fixture = TestBed.createComponent(ArrowSvgComponent);
    component = fixture.componentInstance;
    component.start = start
    component.end = end
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
