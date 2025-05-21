import { XRRay } from '../../src/hittest/XRRay';
import { XRRigidTransform } from '../../src/primitives/XRRigidTransform';

describe('XRRay', () => {
  test('invalid direction throws', () => {
    expect(() => new XRRay(undefined, {x:0,y:0,z:0,w:1})).toThrow();
  });

  test('matrix from transform', () => {
    const t = new XRRigidTransform();
    const ray = new XRRay(t);
    const m = ray.matrix;
    expect(m).toBeInstanceOf(Float32Array);
  });
});
