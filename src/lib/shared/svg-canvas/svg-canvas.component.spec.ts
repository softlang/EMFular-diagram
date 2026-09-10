import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCanvasComponent } from './svg-canvas.component';

describe('SvgCanvasComponent', () => {
  let component: SvgCanvasComponent;
  let fixture: ComponentFixture<SvgCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgCanvasComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
