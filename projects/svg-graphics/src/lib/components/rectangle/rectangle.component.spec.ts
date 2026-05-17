import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleComponent } from './rectangle.component';

describe('RectangleComponent', () => {
  let component: RectangleComponent;
  let fixture: ComponentFixture<RectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangleComponent);
    component = fixture.componentInstance;

    component.position = { x: 0, y: 0, w: 100, h: 50 };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
