export interface SvgTextStyle {
    color?: string; //fill
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    fontStyle?: string;
    textAnchor?: string;
}

export const DEFAULT_TEXT_STYLE: SvgTextStyle = {
    color: 'black'
}
