import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCanvasComponent } from './svg-canvas.component';
import {SvgPositionChangeService} from "../svg-position-change.service";

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

  it('provides a separate SvgPositionChangeService for each canvas', () => {
    const fixture1 = TestBed.createComponent(SvgCanvasComponent);
    const fixture2 = TestBed.createComponent(SvgCanvasComponent);

    const canvas1 = fixture1.componentInstance;
    const canvas2 = fixture2.componentInstance;

    const service1 = fixture1.debugElement.injector.get(SvgPositionChangeService);
    const service2 = fixture2.debugElement.injector.get(SvgPositionChangeService);

    expect(service1).not.toBe(service2);
  });

  it('does not deliver position changes between canvases', () => {
    const fixture1 = TestBed.createComponent(SvgCanvasComponent);
    const fixture2 = TestBed.createComponent(SvgCanvasComponent);

    const service1 = fixture1.debugElement.injector.get(SvgPositionChangeService);
    const service2 = fixture2.debugElement.injector.get(SvgPositionChangeService);

    const changes1: string[] = [];
    const changes2: string[] = [];

    service1.positionChange.subscribe(id => changes1.push(id));
    service2.positionChange.subscribe(id => changes2.push(id));

    service1.notifyPositionChangeWithoutCascade('element1');

    expect(changes1).toEqual(['element1']);
    expect(changes2).toEqual([]);
  });
});
