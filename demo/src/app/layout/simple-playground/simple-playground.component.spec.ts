import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePlaygroundComponent } from './simple-playground.component';

describe('SimplePlaygroundComponent', () => {
  let component: SimplePlaygroundComponent;
  let fixture: ComponentFixture<SimplePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplePlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
