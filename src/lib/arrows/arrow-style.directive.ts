import {Directive, HostBinding, Input} from "@angular/core";
import {ArrowStyle} from "./arrow-style";

@Directive({
    selector: '[arrow-style]',
})
export class ArrowStyleDirective {
    @Input() arrowStyle!: ArrowStyle;

    @HostBinding('attr.stroke')
    get color() {
        return this.arrowStyle?.color;
    }

    @HostBinding('attr.stroke-dasharray')
    get strokeDashArray() {
        return this.arrowStyle?.strokeDashArray;
    }

    @HostBinding('attr.stroke-width')
    get strokeWidth() {
        return this.arrowStyle?.strokeWidth;
    }

    @HostBinding('attr.marker-start')
    get startPointer() {
        return this.arrowStyle?.startPointer
            ? `url(#${this.arrowStyle.startPointer})`
            : null;
    }

    @HostBinding('attr.marker-end')
    get endPointer() {
        return this.arrowStyle?.endPointer
            ? `url(#${this.arrowStyle.endPointer})`
            : null;
    }
}