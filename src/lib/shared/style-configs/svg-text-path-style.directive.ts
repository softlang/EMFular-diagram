import { Directive, HostBinding, Input } from '@angular/core';
import { SvgTextPathStyle } from './svg-text-path-style';

@Directive({
    selector: '[text-path-style]',
})
export class SvgTextPathStyleDirective {
    @Input() textPathStyle!: SvgTextPathStyle;

    @HostBinding('attr.startOffset')
    get startOffset() {
        return this.textPathStyle?.startOffset;
    }

    @HostBinding('attr.method')
    get method() {
        return this.textPathStyle?.method;
    }

    @HostBinding('attr.spacing')
    get spacing() {
        return this.textPathStyle?.spacing;
    }

    @HostBinding('attr.side')
    get side() {
        return this.textPathStyle?.side;
    }

    @HostBinding('attr.lengthAdjust')
    get lengthAdjust() {
        return this.textPathStyle?.lengthAdjust;
    }

    @HostBinding('attr.textLength')
    get textLength() {
        return this.textPathStyle?.textLength;
    }
}