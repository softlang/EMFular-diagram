import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPlaygroundComponent } from './svg-playground.component';

describe('SvgPlaygroundComponent', () => {
  let component: SvgPlaygroundComponent;
  let fixture: ComponentFixture<SvgPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
