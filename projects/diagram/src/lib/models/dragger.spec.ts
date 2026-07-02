import { Dragger } from './dragger';

describe('Dragger', () => {
  it('should create an instance', () => {
    let example = {gId: "id", position: { x: 1, y: 2, w: 2, h: 1 }};

    expect(new Dragger(example)).toBeTruthy();
  });
});
