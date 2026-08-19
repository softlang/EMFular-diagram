import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectDraggableComponent } from './rect-draggable.component';

describe('RectDraggableComponent', () => {
  let component: RectDraggableComponent;
  let fixture: ComponentFixture<RectDraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectDraggableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
