import { Gamepad, GamepadMappingType, GamepadButton, GamepadConfig } from '../../src/gamepad/Gamepad';
import { P_GAMEPAD } from '../../src/private';

describe('Gamepad', () => {
  const config: GamepadConfig = {
    mapping: GamepadMappingType.Standard,
    buttons: [
      { id: 'a', type: 'analog' },
      { id: 'm', type: 'manual' }
    ],
    axes: [
      { id: 's', type: 'x-axis' },
      { id: 's', type: 'y-axis' }
    ]
  };

  test('constructor and getters', () => {
    const gp = new Gamepad(config, 'id1', 1);
    expect(gp.id).toBe('id1');
    expect(gp.index).toBe(1);
    expect(gp.mapping).toBe(GamepadMappingType.Standard);
    expect(gp.axes).toEqual([0,0]);
    expect(gp.buttons.length).toBe(2);
  });

  test('buttons and axes update', () => {
    const gp = new Gamepad(config);
    gp[P_GAMEPAD].axesMap['s'].x = 0.5;
    gp[P_GAMEPAD].axesMap['s'].y = -0.25;
    gp[P_GAMEPAD].buttonsMap['a']![P_GAMEPAD].value = 0.1;
    gp[P_GAMEPAD].buttonsMap['m']![P_GAMEPAD].pressed = true;
    gp[P_GAMEPAD].buttonsMap['m']![P_GAMEPAD].touched = true;
    expect(gp.axes).toEqual([0.5,-0.25]);
    const [analog, manual] = gp.buttons as GamepadButton[];
    expect(analog.pressed).toBe(true);
    expect(manual.touched).toBe(true);
  });
});
