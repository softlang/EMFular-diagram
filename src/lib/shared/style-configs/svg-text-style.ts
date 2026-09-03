export interface SvgTextStyle {
    'fill'?: string;
    'font-family'?: string;
    'font-size'?: string | number;
    'font-weight'?: string | number;
    'font-style'?: string;
    'text-anchor'?: 'start' | 'middle' | 'end';
}

export const DEFAULT_TEXT_STYLE: SvgTextStyle = {
    'fill': 'black'
}

export interface SvgTextPathStyle extends SvgTextStyle {
    'startOffset'?: string | number;
    'method'?: 'align' | 'stretch';
    'spacing'?: 'auto' | 'exact';
    'side'?: 'left' | 'right';
    'lengthAdjust'?: 'spacing' | 'spacingAndGlyphs';
    'textLength'?: string | number;
}

export const DEFAULT_TEXTPATH_STYLE: SvgTextStyle = {
    ...DEFAULT_TEXT_STYLE,
}