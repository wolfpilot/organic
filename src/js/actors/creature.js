// Utils
import { easeInOutCubic } from '../utils/easings';

// Constants
// @TODO: Configurable per pattern (default, heart, etc) later on
const PULSE_SPEED = 2000; // 1 cycle every 2 seconds

/**
 * Update pulse opacity
 * @param {Object} state - Old state
 * @param {Number} elapsedLifecyclePercentage - The current completion percentage of a start - end cycle
 * @returns {Number} - The updated opacity value
 * @private
 */
const _updateOpacity = (state, elapsedLifecyclePercentage) => {
    if (elapsedLifecyclePercentage === 0) {
        return 0;
    }

    // The rate of change
    const dx = 1 - state.strokeStyle.a;

    state.strokeStyle.a += dx * easeInOutCubic(elapsedLifecyclePercentage / 100);

    return state.strokeStyle.a;
};

/**
 * Update pulse radius
 * @param {Object} state - Old state
 * @param {Number} elapsedLifecyclePercentage - The current completion percentage of a start - end cycle
 * @returns {Number} - The updated radius value
 * @private
 */
const _updateRadius = (state, elapsedLifecyclePercentage) => {
    if (elapsedLifecyclePercentage === 0) {
        return state.startRadius;
    }

    // The rate of change
    const dx = 0 - state.radius;
    // const dx = state.endRadius - state.radius;
    // console.log(state.radius);

    state.radius += dx * easeInOutCubic(elapsedLifecyclePercentage / 100);

    return state.radius;
};

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

    /** @NOTE: Can prevTick be initialised to 0 if undefined? Don't update state directly! */
    if (parseInt((timestamp - state.prevTick) / PULSE_SPEED, 10) >= 1) {
        nextState.prevTick = timestamp;
    }

    /**
     * @NOTE: Can also have a flag for hasLifecycleEnded = true/false
     * @NOTE: if (!hasLifecycleEnded) { return; } if needed
     *
     * @NOTE: Is this state or just a calculation?
     * @NOTE: func calculateLifecycle()?
     */
    const elapsedLifecyclePercentage = parseInt(100 * (timestamp - nextState.prevTick) / PULSE_SPEED, 10);

    nextState.strokeStyle.a = _updateOpacity(state, elapsedLifecyclePercentage);
    nextState.radius = _updateRadius(state, elapsedLifecyclePercentage);

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

    const nextState = { ...state };

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
