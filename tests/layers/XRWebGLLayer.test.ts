import { XRWebGLLayer } from '../../src/layers/XRWebGLLayer';
import { XRSession } from '../../src/session/XRSession';
import { XRDevice, XRDeviceConfig } from '../../src/device/XRDevice';
import { XRInteractionMode } from '../../src/session/XRSession';
import { P_SESSION } from '../../src/private';

const deviceConfig: XRDeviceConfig = {
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

function makeSession() {
  const device = new XRDevice(deviceConfig);
  return new XRSession(device, 'inline', []);
}

describe('XRWebGLLayer', () => {
  test('constructor throws when ended', () => {
    const session = makeSession();
    session[P_SESSION].ended = true;
    expect(() => new XRWebGLLayer(session, {} as any)).toThrow();
  });

  test('static framebuffer scale factor', () => {
    const session = makeSession();
    expect(XRWebGLLayer.getNativeFramebufferScaleFactor(session)).toBe(1);
    session[P_SESSION].ended = true;
    expect(XRWebGLLayer.getNativeFramebufferScaleFactor(session)).toBe(0);
  });
});
