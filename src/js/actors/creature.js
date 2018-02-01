// @TODO: Set the frequency of the pulse to 1/60 frames
// @TODO: Pass frame count (timestamp?) through as 'global' state

/**
 * Create a new pulse
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 * @private
 */
const _makePulse = state => {
    let nextState = { ...state };

    nextState.radius = state.radius > 0 ? state.radius - 1 : state.defaultRadius;

    return nextState;
};

/**
 * Update and return new state
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 */
const update = state => {
    if (!state.pulses) { return {}; }

    let nextState = { ...state };

    nextState.pulses = state.pulses.map(pulse => _makePulse(pulse));

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
        ctx.strokeStyle = `rgb(${pulse.strokeStyle.r}, ${pulse.strokeStyle.g}, ${pulse.strokeStyle.b}`;
        ctx.stroke();
    });
};

export { draw, update };
