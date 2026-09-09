export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function newBoundingBox(
    x = 0,
    y = 0,
    width = 5,
    height = 5
): BoundingBox {
  return { x, y, w: width, h: height };
}
