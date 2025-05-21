import { XRPlane, NativePlane, XREntityOrientation } from '../../src/planes/XRPlane';
import { XRRigidTransform } from '../../src/primitives/XRRigidTransform';
import { XRSpace } from '../../src/spaces/XRSpace';
import { DOMPointReadOnly } from '../../src/utils/DOMPointReadOnly';
import { XRSemanticLabels } from '../../src/labels/labels';

describe('XRPlane', () => {
  test('orientation from label', () => {
    const poly = [new DOMPointReadOnly(0,0,0,1)];
    const native = new NativePlane(new XRRigidTransform(), poly, XRSemanticLabels.Wall);
    const plane = new XRPlane(native, new XRSpace(), poly, XRSemanticLabels.Wall);
    expect(plane.orientation).toBe(XREntityOrientation[XRSemanticLabels.Wall]);
  });
});
