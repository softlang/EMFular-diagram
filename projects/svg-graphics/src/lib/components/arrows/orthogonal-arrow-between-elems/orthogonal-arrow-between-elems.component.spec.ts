import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthogonalArrowBetweenElemsComponent } from './orthogonal-arrow-between-elems.component';
import { OrthogonalArrowGeometry } from '../orthogonal-arrow-between-boxes/orthogonal-arrow-between-boxes.component';

describe('OrthogonalArrowBetweenElemsComponent', () => {
  let component: OrthogonalArrowBetweenElemsComponent;
  let fixture: ComponentFixture<OrthogonalArrowBetweenElemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrthogonalArrowBetweenElemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrthogonalArrowBetweenElemsComponent);
    component = fixture.componentInstance;

    component.startGID = 'start';
    component.endGID = 'end';

    fixture.detectChanges();
  });

  it('creates the wrapper component', () => {
    expect(component).toBeTruthy();
  });

  it('builds element ids from gid and suffix inputs', () => {
    component.startGID = 'start';
    component.startSuffix = '-box';
    component.endGID = 'end';
    component.endSuffix = '-box';

    component.ngOnChanges();

    expect(component.startId).toBe('start-box');
    expect(component.endId).toBe('end-box');
  });

  it('keeps local geometry in sync with the box based arrow', () => {
    const geometry: OrthogonalArrowGeometry = {
      controlPoints: [{ x: 10, y: 20 }],
      startAnchor: { side: 'right', offset: 0.5 },
      endAnchor: { side: 'left', offset: 0.5 },
    };

    spyOn(component.geometryChange, 'emit');

    component.onGeometryChange(geometry);

    expect(component.controlPoints).toEqual(geometry.controlPoints);
    expect(component.startAnchor).toEqual(geometry.startAnchor);
    expect(component.endAnchor).toEqual(geometry.endAnchor);
    expect(component.geometryChange.emit).toHaveBeenCalledWith(geometry);
  });
});