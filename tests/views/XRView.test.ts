import { XRView, XREye } from '../../src/views/XRView';
import { XRRigidTransform } from '../../src/primitives/XRRigidTransform';

describe('XRView', () => {
  const session = {} as any;
  const transform = new XRRigidTransform();
  const projection = new Float32Array(16);

  test('getters', () => {
    const view = new XRView(XREye.Left, projection, transform, session);
    expect(view.eye).toBe(XREye.Left);
    expect(view.projectionMatrix).toBe(projection);
    expect(view.transform).toBe(transform);
    expect(view.recommendedViewportScale).toBeNull();
  });

  test('requestViewportScale validation', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const view = new XRView(XREye.Left, projection, transform, session);
    view.requestViewportScale(null);
    expect(warn).toHaveBeenCalled();
    view.requestViewportScale(0.5);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
