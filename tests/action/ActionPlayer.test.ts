import { mergeTransform } from '../../src/action/ActionPlayer';
import { vec3, quat } from 'gl-matrix';

describe('mergeTransform', () => {
  test('lerp and slerp', () => {
    const f1 = [0,0,0,0,0,0,1];
    const f2 = [2,0,0,0,0,0,1];
    const p = vec3.create();
    const q = quat.create();
    mergeTransform(f1, f2, 0.5, p, q);
    expect(Array.from(p)).toEqual([1,0,0]);
  });
});
