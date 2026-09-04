export interface SvgTextPathStyle {
    startOffset?: string;
    method?: 'align' | 'stretch';
    spacing?: 'auto' | 'exact';
    side?: 'left' | 'right';
    lengthAdjust?: 'spacing' | 'spacingAndGlyphs';
    textLength?: string;
}