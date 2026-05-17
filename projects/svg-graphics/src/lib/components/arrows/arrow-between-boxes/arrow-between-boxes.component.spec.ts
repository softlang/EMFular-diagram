import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ArrowBetweenBoxesComponent } from './arrow-between-boxes.component';
import { BoundingBox } from '../../../models/bounding-box';

describe('ArrowBetweenBoxesComponent', () => {
  let component: ArrowBetweenBoxesComponent;
  let fixture: ComponentFixture<ArrowBetweenBoxesComponent>;

  const start: BoundingBox = { x: 50, y: -20, w: 200, h: 80 };
  const end: BoundingBox = { x: 80, y: 20, w: 100, h: 200 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowBetweenBoxesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowBetweenBoxesComponent);
    component = fixture.componentInstance;

    component.start = start;
    component.end = end;

    fixture.detectChanges();
  });

  it('creates the component with start and end boxes', () => {
    expect(component).toBeTruthy();
  });

  it('creates a SVG path for bent arrows', () => {
    component.bent = true;

    component.ngOnChanges();

    expect(component.pathData).toMatch(/^M .* L .*/);
  });

  it('emits geometry changes when a control point is removed', () => {
    component.bent = true;
    component.controlPoints = [{ x: 100, y: 100 }];

    component.ngOnChanges();

    spyOn(component.geometryChange, 'emit');
    spyOn(component.controlPointsChange, 'emit');

    component.removeControlPoint(0, mouseEvent());

    expect(component.controlPoints).toEqual([]);
    expect(component.controlPointsChange.emit).toHaveBeenCalledWith([]);
    expect(component.geometryChange.emit).toHaveBeenCalled();
  });
});

function mouseEvent(): MouseEvent {
  return {
    stopPropagation: jasmine.createSpy('stopPropagation'),
  } as unknown as MouseEvent;
}