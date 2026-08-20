import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSimplePlaygroundComponent } from './svg-simple-playground.component';

describe('SvgSimplePlaygroundComponent', () => {
  let component: SvgSimplePlaygroundComponent;
  let fixture: ComponentFixture<SvgSimplePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgSimplePlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgSimplePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
