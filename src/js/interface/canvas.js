/**
 * Setup the canvas
 * @param {Object} canvas - The HTML5 canvas element
 */
const setup = canvas => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

/**
 * Draw to the canvas
 * @param {Object} ctx - The canvas context to draw onto
 * @param {Object} state - Current state
 */
const draw = (ctx, state) => {
    ctx.fillStyle = state.fill;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

/**
 * Clear the canvas
 * @param {Object} ctx - The canvas context
 */
const clear = ctx => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
};

export { setup, draw, clear };
