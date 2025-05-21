import { XRMesh, NativeMesh } from '../../src/meshes/XRMesh';
import { XRRigidTransform } from '../../src/primitives/XRRigidTransform';
import { XRSpace } from '../../src/spaces/XRSpace';
import { XRSemanticLabels } from '../../src/labels/labels';

describe('XRMesh', () => {
  test('getters', () => {
    const transform = new XRRigidTransform();
    const native = new NativeMesh(transform, new Float32Array([0,1,2]), new Uint32Array([0,1,2]), XRSemanticLabels.Desk);
    const space = new XRSpace();
    const mesh = new XRMesh(native, space, native.vertices, native.indices, XRSemanticLabels.Desk);
    expect(mesh.meshSpace).toBe(space);
    expect(mesh.vertices).toBe(native.vertices);
    expect(mesh.indices).toBe(native.indices);
    expect(mesh.semanticLabel).toBe(XRSemanticLabels.Desk);
  });
});
