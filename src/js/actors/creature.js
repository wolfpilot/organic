// Utils
import { valBetween } from '../utils/helpers';

/**
 * Create a new pulse
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 * @private
 */
const _makePulse = (timestamp, state) => {
    if (!timestamp) { return state; }

    let nextState = { ...state };

    // Need to determine what amount of the lifecycle of a pulse has passed, not based on opacity.
    nextState.strokeStyle.a = valBetween(state.strokeStyle.a + 0.1, 0, 1);
    nextState.radius = state.radius > 0 ? state.radius - 1 : state.defaultRadius;

    return nextState;
};

/**
 * Update and return new state
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 */
const update = (timestamp, state) => {
    if (!state.pulses) { return {}; }

    let nextState = { ...state };

    nextState.pulses = state.pulses.map(pulse => _makePulse(timestamp, pulse));

    return { ...nextState };
};

/**
 * Draw to the canvas
 * @param {Object} ctx - The canvas context to draw onto
 * @param {Object} state - Current state
 */
const draw = (ctx, state) => {
    state.pulses.forEach(pulse => {
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, 2 * Math.PI);
        ctx.lineWidth = pulse.lineWidth;
        ctx.strokeStyle = `rgba(${pulse.strokeStyle.r}, ${pulse.strokeStyle.g}, ${pulse.strokeStyle.b}, ${pulse.strokeStyle.a}`;
        ctx.stroke();
    });
};

export { draw, update };
