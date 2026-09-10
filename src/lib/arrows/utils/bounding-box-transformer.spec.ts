import {describe, it, expect} from 'vitest';
import {BoundingBoxTransformer} from './bounding-box-transformer';
import {BoundingBox, newBoundingBox} from '../../shared/models/bounding-box';
;

describe('PositionHelper', () => {
  function mockSvgElement(
      bbox: BoundingBox = newBoundingBox(),
      ctm: DOMMatrix = new DOMMatrix()
  ): SVGGraphicsElement {
    return {
      getBBox: () => ({
        x: bbox.x,
        y: bbox.y,
        width: bbox.w,
        height: bbox.h
      } as DOMRect),
      getCTM: () => ctm
    } as any;
  }

  describe('getRelativeBBox', () => {
    it('returns the original bbox when both elements use the same coordinate system', () => {
      const elem = mockSvgElement(
        newBoundingBox(10, 20, 100, 50),
      );
      const relativeTo = mockSvgElement();

      const result = BoundingBoxTransformer.getRelativeBBox(elem, relativeTo);
      expect(result).toEqual(newBoundingBox(10, 20, 100, 50));
    });

    it('calculates the bbox relative to a translated element', () => {
      const elem = mockSvgElement(
          newBoundingBox(10, 10, 20, 30),
          new DOMMatrix([1, 0, 0, 1, 50, 50])
      );
      const relativeTo = mockSvgElement(
          newBoundingBox(),
          new DOMMatrix([1, 0, 0, 1, 20, 20])
      );

      const result = BoundingBoxTransformer.getRelativeBBox(elem, relativeTo);
      expect(result).toEqual(newBoundingBox(40, 40, 20, 30));
    });

    it('applies scaling to the bbox', () => {
      const elem = mockSvgElement(
          newBoundingBox(10, 20,100, 50),
          new DOMMatrix([2, 0, 0, 2, 0, 0])
      );
      const relativeTo = mockSvgElement();

      const result = BoundingBoxTransformer.getRelativeBBox(elem, relativeTo);
      expect(result).toEqual(newBoundingBox(20, 40, 200, 100));
    });

    it('calculates the axis-aligned bbox after rotation', () => {
      const elem = mockSvgElement(
          newBoundingBox(10, 20, 100, 50),
          new DOMMatrix([0, 1, -1, 0, 0, 0])
      );
      const relativeTo = mockSvgElement();

      const result = BoundingBoxTransformer.getRelativeBBox(elem, relativeTo);
      expect(result).toEqual(newBoundingBox(-70, 10, 50, 100));
    });

    it('handles negative scaling', () => {
      const elem = mockSvgElement(
          newBoundingBox(10, 20, 100, 50),
          new DOMMatrix([-2, 0, 0, 3, 0, 0])
      );
      const relativeTo = mockSvgElement();

      const result = BoundingBoxTransformer.getRelativeBBox(elem, relativeTo);
      expect(result).toEqual(newBoundingBox(-220, 60, 200, 150));
    });
  });

  describe('matrixTransform', () => {
    it('returns a transformed point using the given matrix but does not change the original point', () => {
      let point = {x: 10, y: 20};
      const matrix = new DOMMatrix([1, 0, 0, 1, 5, 7]);

      const result = BoundingBoxTransformer.matrixTransform(point, matrix);
      expect(point).toEqual({x: 10, y: 20});
      expect(result).toEqual({x: 15, y: 27});
    });

  });
});