import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleWithTextComponent } from './rectangle-with-text.component';

describe('RectangleWithTextComponent', () => {
  let component: RectangleWithTextComponent;
  let fixture: ComponentFixture<RectangleWithTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangleWithTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangleWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
