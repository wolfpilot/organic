// Config
import { setup } from './setup';

// Utils
import * as canvas from './interface/canvas';
import * as creature from './actors/creature';

// @TODO: Move these to the engine
const fpsInterval = 1000 / setup.engine.fps;
let lastDrawTime = performance.now();

/**
 * Draw on the canvas
 * @param {Object} ctx - The drawing context
 * @param {Object} state - New state to be drawn onto the canvas
 * @private
 */
const _draw = (ctx, state) => {
    canvas.draw(ctx, state.canvas);
    creature.draw(ctx, state.creature);
};

/**
 * Get new 'global' state
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} state - The previous 'global' state
 * @returns {Object} - Return next state
 */
const update = (timestamp, state) => {
    return {
        canvas: { ...state.canvas },
        creature: { ...creature.update(timestamp, state.creature) }
    };
};

/**
 * Render a new frame
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} ctx - The drawing context
 * @param {Object} state - The previous 'global' state
 * @private
 */
const _tick = (timestamp, ctx, state) => {
    // @TODO: Can the logic / render be completely separated in an engine?
    // Elapsed time between rendered frames
    const elapsedInterval = timestamp - lastDrawTime;

    // Get the next state
    const nextState = update(timestamp, state);

    // Request the next frame
    window.requestAnimationFrame(nextTimestamp => _tick(nextTimestamp, ctx, nextState));

    // Check if enough time has passed to render a new frame
    if (elapsedInterval > fpsInterval) {
        lastDrawTime = timestamp - (elapsedInterval % fpsInterval);

        canvas.clear(ctx);
        _draw(ctx, nextState);
    }
};

// @TODO: Need to re-initialize or recalculate aspect ratio, would be too annoying to restart everything
/**
 * Bind listeners
 * @param {Object} canvasEl - The HTML5 canvas element
 * @private
 */
const _addEventListeners = canvasEl => {
    // @TODO: rAF this!
    window.addEventListener('resize', () => canvas.setup(canvasEl));
};

const init = () => {
    // Set up canvas
    const canvasEl = document.getElementById('canvas');
    const ctx = canvasEl.getContext('2d');

    // Set initial state
    const initialState = { ...setup };

    canvas.setup(canvasEl);

    _addEventListeners(canvasEl);
    _tick(0, ctx, initialState);
};

export { init };
