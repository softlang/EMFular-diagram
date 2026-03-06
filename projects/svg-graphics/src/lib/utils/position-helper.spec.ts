import { PositionHelper } from './position-helper';

describe('PositionHelper', () => {
  it('should create an instance', () => {
    expect(new PositionHelper()).toBeTruthy();
  });

  it('applies a simple translation matrix', () => {
    const p = { x: 10, y: 20 };
    const m = new DOMMatrix([1, 0, 0, 1, 5, 7]); // translate by (5,7)
    PositionHelper.matrixTransform(p, m);
    expect(p.x).toBe(15);
    expect(p.y).toBe(27);
  });

  it('creates a bounding box with default values', () => {
    const bb = PositionHelper.newBoundingBox();
    expect(bb).toEqual({ x: 0, y: 0, w: 5, h: 5 });
  });

  function mockSvgElement(options: {
    bbox?: Partial<DOMRect>;
    ctm?: DOMMatrix;
    screenCtm?: DOMMatrix;
  }): SVGGraphicsElement {
    return {
      getBBox: () => ({
        x: options.bbox?.x ?? 0,
        y: options.bbox?.y ?? 0,
        width: options.bbox?.width ?? 10,
        height: options.bbox?.height ?? 10
      } as DOMRect),
      getCTM: () => options.ctm ?? new DOMMatrix(),
      ownerSVGElement: {
        getScreenCTM: () => options.screenCtm ?? new DOMMatrix()
      } as any
    } as any;
  }

  it('computes absolute position with identity transforms', () => {
    const elem = mockSvgElement({
      bbox: { x: 10, y: 20, width: 100, height: 50 },
      ctm: new DOMMatrix(),          // identity
      screenCtm: new DOMMatrix()     // identity
    });

    const bb = PositionHelper.absolutePosition(elem);

    expect(bb).toEqual({ x: 10, y: 20, w: 100, h: 50 });
  });

  it('computes absolute position with scaling', () => {
    const elem = mockSvgElement({
      bbox: { x: 10, y: 20, width: 100, height: 50 },
      ctm: new DOMMatrix([2,0,0,2,0,0]),     // scale(2)
      screenCtm: new DOMMatrix()            // identity
    });

    const bb = PositionHelper.absolutePosition(elem);

    expect(bb.x).toBe(20);
    expect(bb.y).toBe(40);
    expect(bb.w).toBe(200);
    expect(bb.h).toBe(100);
  });

  it('makes a point relative to another element', () => {
    const p = { x: 100, y: 50 };

    const elem = mockSvgElement({
      ctm: new DOMMatrix([1,0,0,1,10,20]), // translate(10,20)
      screenCtm: new DOMMatrix()           // identity
    });

    PositionHelper.makeRelativeToElem(p, elem);

    expect(p.x).toBe(90);
    expect(p.y).toBe(30);
  });

  it('computes bounding box relative to another element', () => {
    const elem = mockSvgElement({
      bbox: { x: 10, y: 10, width: 20, height: 20 },
      ctm: new DOMMatrix([1,0,0,1,50,50]), // elem translated by (50,50)
      screenCtm: new DOMMatrix()
    });

    const node = mockSvgElement({
      ctm: new DOMMatrix([1,0,0,1,20,20]), // node translated by (20,20)
      screenCtm: new DOMMatrix()
    });

    const bb = PositionHelper.getSvgBBPosition(elem, node);

    expect(bb.x).toBe(40); // 50 - 20 + 10
    expect(bb.y).toBe(40);
    expect(bb.w).toBe(20);
    expect(bb.h).toBe(20);
  });

  it('scales width correctly with scaleX only', () => {
    const elem = mockSvgElement({
      bbox: { x: 0, y: 0, width: 10, height: 20 },
      ctm: new DOMMatrix([2, 0, 0, 1, 0, 0]), // scaleX = 2
      screenCtm: new DOMMatrix()
    });
    const bb = PositionHelper.absolutePosition(elem);
    expect(bb.x).toBe(0);
    expect(bb.y).toBe(0);
    expect(bb.w).toBe(20); // 10 * 2
    expect(bb.h).toBe(20); // unchanged
  });

  it('scales height correctly with scaleY only', () => {
    const elem = mockSvgElement({
      bbox: { x: 0, y: 0, width: 10, height: 20 },
      ctm: new DOMMatrix([1, 0, 0, 3, 0, 0]), // scaleY = 3
      screenCtm: new DOMMatrix()
    });
    const bb = PositionHelper.absolutePosition(elem);
    expect(bb.x).toBe(0);
    expect(bb.y).toBe(0);
    expect(bb.w).toBe(10); // unchanged
    expect(bb.h).toBe(60); // 20 * 3
  });

  it('scales width and height correctly with uniform scale', () => {
    const elem = mockSvgElement({
      bbox: { x: 0, y: 0, width: 10, height: 20},
      ctm: new DOMMatrix([2, 0, 0, 2, 0, 0]), // scale(2)
      screenCtm: new DOMMatrix()
    });
    const bb = PositionHelper.absolutePosition(elem);
    expect(bb.x).toBe(0);
    expect(bb.y).toBe(0);
    expect(bb.w).toBe(20); // 10 * 2
    expect(bb.h).toBe(40); // 20 * 2
  });

  describe('computeOffset', () => {

    const cases: Array<[number, number, number]> = [
      // length 1
      [0, 1, 0],

      // length 2
      [0, 2, -0.5],
      [1, 2, 0.5],

      // length 3
      [0, 3, -1],
      [1, 3, 0],
      [2, 3, 1],

      // length 4
      [0, 4, -1.5],
      [1, 4, -0.5],
      [2, 4, 0.5],
      [3, 4, 1.5],
    ];

    cases.forEach(([index, length, expected]) => {
      it(`index=${index}, length=${length} → ${expected}`, () => {
        expect(PositionHelper.computeOffset(index, length)).toBe(expected);
      });
    });
  });

});
