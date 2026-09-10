import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormGroup} from "@angular/forms";

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
    const form = new FormGroup({
      startX: new FormControl(0),
      startY: new FormControl(0),
      endX: new FormControl(100),
      endY: new FormControl(100),
    });
    component.form = form;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
