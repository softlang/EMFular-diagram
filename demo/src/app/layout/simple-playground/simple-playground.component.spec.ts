import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePlaygroundComponent } from './simple-playground.component';
import {FormControl, FormGroup} from "@angular/forms";

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
    const form = new FormGroup({
      startX: new FormControl(0),
      startY: new FormControl(0),
      endX: new FormControl(100),
      endY: new FormControl(100),
    });
    component.form = form;
    component.codeTemplate="no"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
