import { DOMPointReadOnly } from '../../src/utils/DOMPointReadOnly';

describe('DOMPointReadOnly', () => {
  test('default constructor values', () => {
    const p = new DOMPointReadOnly();
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);
    expect(p.z).toBe(0);
    expect(p.w).toBe(1);
  });

  test('fromPoint and toJSON', () => {
    const p = DOMPointReadOnly.fromPoint({ x: 1, y: 2, z: 3, w: 4 });
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
    expect(p.z).toBe(3);
    expect(p.w).toBe(4);
    expect(p.toJSON()).toEqual({ x: 1, y: 2, z: 3, w: 4 });
  });

  test('matrixTransform returns new point', () => {
    const p = new DOMPointReadOnly(1, 2, 3, 4);
    const result = p.matrixTransform({} as any);
    expect(result).not.toBe(p);
    expect(result).toBeInstanceOf(DOMPointReadOnly);
  });

  test('polyfill export path', () => {
    jest.isolateModules(() => {
      const orig = (global as any).DOMPointReadOnly;
      delete (global as any).DOMPointReadOnly;
      const mod = require('../../src/utils/DOMPointReadOnly');
      expect(mod.DOMPointReadOnly.name).toBe('PolyfillDOMPointReadOnly');
      (global as any).DOMPointReadOnly = orig;
    });
  });
});
