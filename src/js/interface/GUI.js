// Utils
import dat from 'dat.gui';

let _state = {};

// @TODO: Need to create an initial state out of all these control values
// @TODO: pulse speed (2000), pause (false)
// @TODO: Since they're persistent (as opposed to the keyboard/mouse input)
// @TODO: These should always be passed around

// Config
const presets = {
    closed: true,
    pause: function() {
        _state.pause = true;
    },
    folders: {
        pulse: {
            closed: false,
            speed: 2000,
            pattern: 'single'
        }
    }
};

/**
 * Update and return new state
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 */
const update = (timestamp, state) => {
    if (!state) { return {}; }

    let nextState = { ...state };

    // console.log(_state);
    nextState = { ..._state };
    // nextState.gui = { ...guiState };

    // nextState.pulses = state.pulses.map(pulse => _makePulse(timestamp, pulse));
    // nextState.pause = guiState.pause;

    return { ...nextState };
};

/**
 * Set up GUI
 * @param {Object} gui - The GUI object
 * @private
 */
const _setup = gui => {
    gui.add(presets, 'pause').name('Pause/Resume');

    const pulse = gui.addFolder('Pulse');

    pulse.add(presets.folders.pulse, 'speed', 0, 5000)
        .name('Speed')
        .onChange(value => {
            console.log(_state);

            _state.speed = value;
        });
    pulse.add(presets.folders.pulse, 'pattern', ['single', 'heartbeat']);
};

/**
 * Initialise
 */
const init = () => {
    const gui = new dat.GUI();

    _setup(gui);
};

export { init, update };
