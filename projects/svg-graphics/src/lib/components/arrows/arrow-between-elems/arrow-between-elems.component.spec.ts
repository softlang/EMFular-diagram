import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowBetweenElemsComponent } from './arrow-between-elems.component';

describe('ArrowBetweenElemsComponent', () => {
  let component: ArrowBetweenElemsComponent;
  let fixture: ComponentFixture<ArrowBetweenElemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowBetweenElemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowBetweenElemsComponent);
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
});