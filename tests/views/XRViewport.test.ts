import { XRViewport } from '../../src/views/XRViewport';

describe('XRViewport', () => {
  test('properties', () => {
    const vp = new XRViewport(1,2,3,4);
    expect(vp.x).toBe(1);
    expect(vp.y).toBe(2);
    expect(vp.width).toBe(3);
    expect(vp.height).toBe(4);
  });
});
