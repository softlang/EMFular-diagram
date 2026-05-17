import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthogonalArrowBetweenBoxesComponent } from './orthogonal-arrow-between-boxes.component';

describe('OrthogonalArrowBetweenBoxesComponent', () => {
  let component: OrthogonalArrowBetweenBoxesComponent;
  let fixture: ComponentFixture<OrthogonalArrowBetweenBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrthogonalArrowBetweenBoxesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrthogonalArrowBetweenBoxesComponent);
    component = fixture.componentInstance;

    component.start = { x: 0, y: 0, w: 100, h: 100 };
    component.end = { x: 300, y: 200, w: 100, h: 100 };

    fixture.detectChanges();
  });

  it('creates the component with start and end boxes', () => {
    expect(component).toBeTruthy();
  });

  it('routes the arrow using only horizontal and vertical segments', () => {
    expect(component.pathData).toMatch(/^M .* L .*/);

    for (let index = 1; index < component.routedPoints.length; index++) {
      const previous = component.routedPoints[index - 1];
      const current = component.routedPoints[index];

      expect(previous.x === current.x || previous.y === current.y).toBeTrue();
    }
  });

  it('uses the provided anchors as fixed connection points', () => {
    component.startAnchor = { side: 'right', offset: 0.5 };
    component.endAnchor = { side: 'left', offset: 0.5 };

    fixture.detectChanges();

    expect(component.startPoint).toEqual({ x: 100, y: 50 });
    expect(component.endPoint).toEqual({ x: 300, y: 250 });
  });

  it('emits updated geometry when a control point is removed', () => {
    component.controlPoints = [{ x: 200, y: 100 }];
    fixture.detectChanges();

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