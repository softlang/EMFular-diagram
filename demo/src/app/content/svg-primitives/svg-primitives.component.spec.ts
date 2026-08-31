import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPrimitivesComponent } from './svg-primitives.component';

describe('SvgPrimitivesComponent', () => {
  let component: SvgPrimitivesComponent;
  let fixture: ComponentFixture<SvgPrimitivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgPrimitivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgPrimitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
