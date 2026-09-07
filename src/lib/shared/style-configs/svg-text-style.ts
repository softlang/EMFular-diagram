export interface SvgTextStyle {
    color?: string; //fill
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    textAnchor?: 'start' | 'middle' | 'end';
}

export const DEFAULT_TEXT_STYLE: SvgTextStyle = {
    color: 'black'
}
