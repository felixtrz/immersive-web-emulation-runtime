import { Vector3, Quaternion } from '../../src/utils/Math';

describe('Vector3', () => {
  test('basic operations', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.clone().x).toBe(1);
    v.set(4,5,6);
    expect(v.x).toBe(4);
    v.round();
    expect(v.x).toBe(4);
    const v2 = new Vector3(1,1,1);
    v.add(v2);
    expect(v.x).toBe(5);
    expect(v.y).toBe(6);
    expect(v.z).toBe(7);
    v.normalize();
    expect(Math.hypot(v.x, v.y, v.z)).toBeCloseTo(1);
  });
});

describe('Quaternion', () => {
  test('operations', () => {
    const q = new Quaternion();
    q.setFromAxisAngle(new Vector3(0,1,0), Math.PI/2);
    const clone = q.clone();
    const q2 = new Quaternion(0,0,0,1);
    q2.copy(q).invert().multiply(clone);
    const v = new Vector3(1,0,0);
    v.applyQuaternion(q);
    expect(v.x).toBeCloseTo(0);
  });
});
