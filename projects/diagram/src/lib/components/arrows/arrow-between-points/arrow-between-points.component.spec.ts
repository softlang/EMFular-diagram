import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowBetweenPointsComponent } from './arrow-between-points.component';

describe('ArrowBetweenPointsComponent', () => {
  let component: ArrowBetweenPointsComponent;
  let fixture: ComponentFixture<ArrowBetweenPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowBetweenPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowBetweenPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
