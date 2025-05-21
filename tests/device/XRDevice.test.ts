import { XRDevice, XRDeviceConfig } from '../../src/device/XRDevice';
import { XRInteractionMode } from '../../src/session/XRSession';
import { P_DEVICE } from '../../src/private';

describe('XRDevice', () => {
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

  test('updateVisibilityState', () => {
    const dev = new XRDevice(cfg);
    dev.updateVisibilityState('hidden');
    expect(dev[P_DEVICE].pendingVisibilityState).toBe('hidden');
    expect(() => dev.updateVisibilityState('invalid' as any)).toThrow();
  });
});
