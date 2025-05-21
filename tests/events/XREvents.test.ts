import { XRInputSourcesChangeEvent } from '../../src/events/XRInputSourcesChangeEvent';
import { XRSessionEvent } from '../../src/events/XRSessionEvent';
import { XRReferenceSpaceEvent } from '../../src/events/XRReferenceSpaceEvent';
import { XRDevice, XRDeviceConfig } from '../../src/device/XRDevice';
import { XRInteractionMode } from '../../src/session/XRSession';
import { XRReferenceSpaceType } from '../../src/spaces/XRReferenceSpace';

const deviceConfig: XRDeviceConfig = {
  name: 'd',
  controllerConfig: undefined,
  supportedSessionModes: ['inline'],
  supportedFeatures: ['viewer'],
  supportedFrameRates: [60],
  isSystemKeyboardSupported: false,
  internalNominalFrameRate: 60,
  environmentBlendModes: {},
  interactionMode: XRInteractionMode.WorldSpace,
  userAgent: 'ua'
};

function makeSession() {
  const device = new XRDevice(deviceConfig);
  const system = new (require('../../src/initialization/XRSystem').XRSystem)(device);
  return system.requestSession('inline');
}

describe('Events', () => {
  test('XRSessionEvent validation', async () => {
    const session = await makeSession();
    const evt = new XRSessionEvent('end', { session });
    expect(evt.session).toBe(session);
    expect(() => new XRSessionEvent('end', {} as any)).toThrow();
  });

  test('XRInputSourcesChangeEvent validation', async () => {
    const session = await makeSession();
    const evt = new XRInputSourcesChangeEvent('change', { session, added: [], removed: [] });
    expect(evt.added).toEqual([]);
    expect(() => new XRInputSourcesChangeEvent('c', { added: [], removed: [], session: undefined as any })).toThrow();
    expect(() => new XRInputSourcesChangeEvent('c', { session, removed: [] } as any)).toThrow();
    expect(() => new XRInputSourcesChangeEvent('c', { session, added: [] } as any)).toThrow();
  });

  test('XRInputSourceEvent validation', async () => {
    const session = await makeSession();
    const frame = new (require('../../src/frameloop/XRFrame').XRFrame)(session, 0, false, false, 0);
    const { XRInputSource, XRHandedness, XRTargetRayMode } = require('../../src/input/XRInputSource');
    const { XRSpace } = require('../../src/spaces/XRSpace');
    const { Gamepad, GamepadMappingType } = require('../../src/gamepad/Gamepad');
    const input = new XRInputSource(XRHandedness.None, XRTargetRayMode.Gaze, [], new XRSpace(), new Gamepad({mapping: GamepadMappingType.None, buttons: [], axes: []}));
    const evt = new (require('../../src/events/XRInputSourceEvent').XRInputSourceEvent)('select', { frame, inputSource: input });
    expect(evt.frame).toBe(frame);
    const EventCtor = require('../../src/events/XRInputSourceEvent').XRInputSourceEvent;
    expect(() => new EventCtor('s', { inputSource: input } as any)).toThrow();
    expect(() => new EventCtor('s', { frame } as any)).toThrow();
  });

  test('XRReferenceSpaceEvent validation', async () => {
    const session = await makeSession();
    const refSpace = await session.requestReferenceSpace(XRReferenceSpaceType.Viewer);
    const evt = new XRReferenceSpaceEvent('refchange', { referenceSpace: refSpace });
    expect(evt.referenceSpace).toBe(refSpace);
    expect(() => new XRReferenceSpaceEvent('x', {} as any)).toThrow();
  });
});
