import { TestBed, ComponentFixture } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { TextAreaSvgComponent } from './text-area-svg.component';

describe('TextAreaSvgComponent', () => {
  let component: TextAreaSvgComponent;
  let fixture: ComponentFixture<TextAreaSvgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextAreaSvgComponent],
    });

    fixture = TestBed.createComponent(TextAreaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function initializeDistributedText() {
    component.x = 20;
    component.y = 40;
    component.h = 50;
    component.w = 200;
  }

  function verifyDistributedText(text: string, distributedText: string[]) {
    component.text = text;
    component.distributeText();
    expect(component.distributedText).toEqual(distributedText);
  }

  it('should set a two line distributed text', () => {
    initializeDistributedText();

    verifyDistributedText(
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
        ['Lorem ipsum dolor sit', 'amet, consetetur ...']
    );
  });

  it('should set a short distributed text after setting a longer one', () => {
    initializeDistributedText();

    verifyDistributedText(
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
        ['Lorem ipsum dolor sit', 'amet, consetetur ...']
    );

    verifyDistributedText('Short', ['Short']);
  });
});