// Config
import { setup } from './setup';

// Utils
import * as canvas from './interface/canvas';
import * as creature from './actors/creature';

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
 * @param {Object} state - The previous 'global' state
 * @returns {Object} - Return next state
 */
const update = state => {
    return {
        canvas: { ...state.canvas },
        creature: { ...creature.update(state.creature) }
    };
};

/**
 * Loop and render each frame
 * @param {Object} ctx - The drawing context
 * @param {Object} state - The previous 'global' state
 * @private
 */
const _tick = (ctx, state) => {
    const nextState = update(state);

    canvas.clear(ctx);

    _draw(ctx, nextState);

    window.requestAnimationFrame(() => _tick(ctx, nextState));
};

// @TODO: Need to re-initialize or recalculate aspect ratio
// @TODO: Would be too annoying to restart everything
const _addEventListeners = canvasEl => {
    // @TODO: rAF this!
    window.addEventListener('resize', () => canvas.setup(canvasEl));
};

/**
 * Initialise
 */
const init = () => {
    // Set up canvas
    const canvasEl = document.getElementById('canvas');
    const ctx = canvasEl.getContext('2d');

    // Set initial state
    const initialState = { ...setup };

    canvas.setup(canvasEl);

    _addEventListeners(canvasEl);
    _tick(ctx, initialState);
};

export { init };
