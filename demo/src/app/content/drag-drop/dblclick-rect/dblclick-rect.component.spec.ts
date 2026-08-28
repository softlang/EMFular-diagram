import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DblclickRectComponent } from './dblclick-rect.component';

describe('DblclickRectComponent', () => {
  let component: DblclickRectComponent;
  let fixture: ComponentFixture<DblclickRectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DblclickRectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DblclickRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
