import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgReactivePlaygroundComponent } from './svg-reactive-playground.component';
import {FormControl, FormGroup} from "@angular/forms";

describe('SimplePlaygroundComponent', () => {
  let component: SvgReactivePlaygroundComponent;
  let fixture: ComponentFixture<SvgReactivePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgReactivePlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgReactivePlaygroundComponent);
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
