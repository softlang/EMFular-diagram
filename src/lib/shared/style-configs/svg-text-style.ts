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
