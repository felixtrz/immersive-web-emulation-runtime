import { XRAnchor } from '../../src/anchors/XRAnchor';
import { XRDevice, XRDeviceConfig } from '../../src/device/XRDevice';
import { XRSession } from '../../src/session/XRSession';
import { XRSpace } from '../../src/spaces/XRSpace';
import { P_SESSION } from '../../src/private';
import { XRInteractionMode } from '../../src/session/XRSession';

const cfg: XRDeviceConfig = {
  name: 'd',
  controllerConfig: undefined,
  supportedSessionModes: ['inline'],
  supportedFeatures: [],
  supportedFrameRates: [60],
  isSystemKeyboardSupported: false,
  internalNominalFrameRate: 60,
  environmentBlendModes: {},
  interactionMode: XRInteractionMode.WorldSpace,
  userAgent: 'ua'
};

describe('XRAnchor', () => {
  beforeAll(() => {
    if (!(global as any).crypto) (global as any).crypto = {};
    (global as any).crypto.randomUUID = () => 'uuid';
  });
  test('delete and request handle', async () => {
    const device = new XRDevice(cfg);
    const session = new XRSession(device, 'inline', []);
    const space = new XRSpace();
    const anchor = new XRAnchor(space, session);
    const handle = await anchor.requestPersistentHandle();
    expect(session[P_SESSION].persistentAnchors.get(handle)).toBe(anchor);
    anchor.delete();
    expect(() => anchor.anchorSpace).toThrow();
  });
});
