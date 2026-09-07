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
}