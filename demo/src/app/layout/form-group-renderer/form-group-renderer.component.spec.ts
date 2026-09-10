import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupRendererComponent } from './form-group-renderer.component';

describe('FormGroupRendererComponent', () => {
  let component: FormGroupRendererComponent;
  let fixture: ComponentFixture<FormGroupRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
