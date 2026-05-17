import {
  anchorFromPoint,
  clamp,
  distanceToSegment,
  nearestSegmentIndex,
  pointFromAnchor,
} from './arrow-geometry.util';

describe('arrow-geometry.util', () => {
  const box = { x: 10, y: 20, w: 100, h: 50 };

  it('keeps anchor offsets inside the valid range', () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(0.5)).toBe(0.5);
    expect(clamp(2)).toBe(1);
  });

  it('maps anchors to points on the box border', () => {
    expect(pointFromAnchor(box, { side: 'top', offset: 0.5 })).toEqual({
      x: 60,
      y: 20,
    });

    expect(pointFromAnchor(box, { side: 'right', offset: 0.5 })).toEqual({
      x: 110,
      y: 45,
    });
  });

  it('maps border points back to anchors', () => {
    expect(anchorFromPoint(box, { x: 60, y: 20 })).toEqual({
      side: 'top',
      offset: 0.5,
    });

    expect(anchorFromPoint(box, { x: 110, y: 45 })).toEqual({
      side: 'right',
      offset: 0.5,
    });
  });

  it('measures the distance to a segment', () => {
    expect(
      distanceToSegment(
        { x: 50, y: 20 },
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ),
    ).toBe(20);
  });

  it('finds the closest segment in a routed arrow', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ];

    expect(nearestSegmentIndex({ x: 50, y: 10 }, points)).toBe(0);
    expect(nearestSegmentIndex({ x: 90, y: 50 }, points)).toBe(1);
  });
});