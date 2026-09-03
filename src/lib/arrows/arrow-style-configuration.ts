export interface ArrowStyle {
  color: string; //= stroke
  strokeDashArray: string; //=dashArray e.g. '1 2 4'
  strokeWidth?: number; //thickness of the arrow line
  startPointer?: string; //marker-Id
  endPointer?: string; //marker-Id
}

export const DEFAULT_ARROW_STYLE: ArrowStyle = {color: 'black', strokeDashArray: '0'};
