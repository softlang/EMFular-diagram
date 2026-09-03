import {Directive, HostBinding, Input} from "@angular/core";
import {SvgTextStyle} from "./svg-text-style";

@Directive({
    selector: '[text-style]',
})
export class TextStyleDirective {
    @Input() textStyle!: SvgTextStyle;

    @HostBinding('attr.fill')
    get fill() {
        return this.textStyle?.fill;
    }

    @HostBinding('attr.font-family')
    get fontFamily() {
        return this.textStyle?.['font-family'];
    }

    @HostBinding('attr.font-size')
    get fontSize() {
        return this.textStyle?.['font-size'];
    }

    @HostBinding('attr.font-weight')
    get fontWeight() {
        return this.textStyle?.['font-weight'];
    }

    @HostBinding('attr.font-style')
    get fontStyle() {
        return this.textStyle?.['font-style'];
    }

    @HostBinding('attr.text-anchor')
    get textAnchor() {
        return this.textStyle?.['text-anchor'];
    }
}