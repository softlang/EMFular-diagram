import {SvgTextStyle} from "./svg-text-style";

export interface SvgTextPathStyle extends SvgTextStyle {
    'startOffset'?: string | number;
    'method'?: 'align' | 'stretch';
    'spacing'?: 'auto' | 'exact';
    'side'?: 'left' | 'right';
    'lengthAdjust'?: 'spacing' | 'spacingAndGlyphs';
    'textLength'?: string | number;
}