import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {describe, expect, it, vi, beforeEach, afterEach} from 'vitest';

import {DraggableDirective} from './draggable.directive';
import {SvgPositionChangeService} from '../../shared/svg-position-change.service';
import {Point2D} from '../../shared/models/point2d';

@Component({
    imports: [DraggableDirective],
    template: `
    <svg>
      <g
        id="test-element"
        [dragPosition]="position"
        (positionChanged)="positionChanged($event)"
        (elemReallyClicked)="elemReallyClicked($event)"
        (click)="preventDefault($event)"
      >
      </g>
    </svg>
  `
})
class TestHostComponent {
    position: Point2D = {x: 10, y: 20};

    positionChanged = vi.fn<(position: Point2D) => void>();
    elemReallyClicked = vi.fn<($event: MouseEvent) => void>();

    preventDefault(event: MouseEvent) {
        event.preventDefault();
    }
}

describe('DraggableDirective', () => {

    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;
    let svgAccessService: {
        notifyPositionChange: ReturnType<typeof vi.fn>;
    };

    beforeEach(async () => {
        svgAccessService = {
            notifyPositionChange: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [
                {
                    provide: SvgPositionChangeService,
                    useValue: svgAccessService
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    function getElement(): SVGElement {
        return fixture.debugElement
            .query(By.directive(DraggableDirective))
            .nativeElement;
    }

    it('notifies the SVG access service after view initialization', () => {
        expect(svgAccessService.notifyPositionChange)
            .toHaveBeenCalledWith('test-element');
    });

    it('starts dragging on mousedown', () => {
        const element = getElement();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        expect(host.position).toEqual({
            x: 20,
            y: 40
        });
    });

    it('emits a real click - even though another click handler prevents the default action', () => {
        const element = getElement();
        const event = new MouseEvent('click', {cancelable: true});

        element.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(host.elemReallyClicked).toHaveBeenCalledWith(event);
    });

    it('does not emit a click after dragging', () => {
        const element = getElement();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        const event = new MouseEvent('click');
        element.dispatchEvent(event);

        expect(host.elemReallyClicked).not.toHaveBeenCalled();
    });

    it('emits position changes', () => {
        const element = getElement();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        expect(host.positionChanged)
            .toHaveBeenCalledWith(host.position);
    });

    it('notifies the SVG access service with the host element id when position changes', () => {
        const element = getElement();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        expect(svgAccessService.notifyPositionChange)
            .toHaveBeenCalledWith('test-element');
    });

    it('uses a new position when the input is replaced', () => {
        const element = getElement();

        const oldPosition = host.position;
        const newPosition: Point2D = {x: 50, y: 60};

        host.position = newPosition;
        fixture.detectChanges();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        expect(newPosition).toEqual({
            x: 60,
            y: 80
        });

        expect(oldPosition).toEqual({
            x: 10,
            y: 20
        });
    });

    it('continues dragging when the position input is replaced during a drag, using the new position as basis', () => {
        const element = getElement();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        const newPosition: Point2D = {x: 50, y: 60};
        host.position = newPosition;
        fixture.detectChanges();

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 110,
            clientY: 120
        }));

        expect(newPosition).toEqual({
            x: 60,
            y: 80
        });
    });

    it('cleans up the dragger when destroyed', () => {
        const element = getElement();

        element.dispatchEvent(new MouseEvent('mousedown', {
            clientX: 100,
            clientY: 100
        }));

        fixture.destroy();

        window.dispatchEvent(new MouseEvent('mousemove', {
            clientX: 200,
            clientY: 200
        }));

        expect(host.position).toEqual({
            x: 10,
            y: 20
        });
    });
});