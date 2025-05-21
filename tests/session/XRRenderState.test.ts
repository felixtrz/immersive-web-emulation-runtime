import { XRRenderState } from '../../src/session/XRRenderState';

class DummyLayer{};

describe('XRRenderState', () => {
  test('defaults', () => {
    const rs = new XRRenderState();
    expect(rs.depthNear).toBeCloseTo(0.1);
    expect(rs.depthFar).toBeCloseTo(1000);
    expect(rs.inlineVerticalFieldOfView).toBeNull();
    expect(rs.baseLayer).toBeNull();
  });

  test('custom values and old state', () => {
    const base = new XRRenderState({ depthNear: 1, depthFar: 2, baseLayer: new DummyLayer() as any });
    const rs = new XRRenderState({ inlineVerticalFieldOfView: 0.5 }, base);
    expect(rs.depthNear).toBe(1);
    expect(rs.depthFar).toBe(2);
    expect(rs.inlineVerticalFieldOfView).toBe(0.5);
    expect(rs.baseLayer).toBe(base.baseLayer);
  });

  test('init baseLayer overrides old state', () => {
    const oldState = new XRRenderState({ baseLayer: new DummyLayer() as any });
    const newLayer = new DummyLayer() as any;
    const rs = new XRRenderState({ baseLayer: newLayer }, oldState);
    expect(rs.baseLayer).toBe(newLayer);
  });

  test('old state fallback when baseLayer missing', () => {
    const oldState = new XRRenderState();
    const rs = new XRRenderState({}, oldState);
    expect(rs.baseLayer).toBeNull();
  });
});
