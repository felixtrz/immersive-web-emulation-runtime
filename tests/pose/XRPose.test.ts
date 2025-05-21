import { XRPose } from '../../src/pose/XRPose';
import { XRViewerPose } from '../../src/pose/XRViewerPose';
import { XRJointPose } from '../../src/pose/XRJointPose';
import { XRRigidTransform } from '../../src/primitives/XRRigidTransform';
import { XRView, XREye } from '../../src/views/XRView';

describe('Pose classes', () => {
  const transform = new XRRigidTransform();

  test('XRPose getters', () => {
    const pose = new XRPose(transform, true);
    expect(pose.transform).toBe(transform);
    expect(pose.emulatedPosition).toBe(true);
  });

  test('XRViewerPose views property', () => {
    const view = new XRView(XREye.Left, new Float32Array(16), transform, {} as any);
    const viewer = new XRViewerPose(transform, [view]);
    expect(viewer.views[0]).toBe(view);
  });

  test('XRJointPose radius', () => {
    const joint = new XRJointPose(transform, 0.5);
    expect(joint.radius).toBe(0.5);
  });
});
