export interface ArrowStyleConfiguration {
  color: string;
  dashed: number[];
  startPointer?: string;
  endPointer?: string;
  style?: Record<string, string>|string;
}

export interface LineStyleConfiguration {
  color?: string; //= stroke
  dashed?: string; //=dashArray
  startPointer?: string; //marker-Id
  endPointer?: string; //marker-Id
  style?: Record<string, string>|string; //additional styles, no overwrite of other attributes
}
