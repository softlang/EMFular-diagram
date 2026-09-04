import {Directive, HostBinding, Input} from "@angular/core";
import {SvgTextStyle} from "./svg-text-style";

@Directive({
    selector: '[text-style]',
})
export class TextStyleDirective {
    @Input() textStyle!: SvgTextStyle;

    @HostBinding('attr.fill')
    get color() {
        return this.textStyle?.color;
    }

    @HostBinding('attr.font-family')
    get fontFamily() {
        return this.textStyle?.fontFamily;
    }

    @HostBinding('attr.font-size')
    get fontSize() {
        return this.textStyle?.fontSize;
    }

    @HostBinding('attr.font-weight')
    get fontWeight() {
        return this.textStyle?.fontWeight;
    }

    @HostBinding('attr.font-style')
    get fontStyle() {
        return this.textStyle?.fontStyle;
    }

    @HostBinding('attr.text-anchor')
    get textAnchor() {
        return this.textStyle?.textAnchor;
    }
}