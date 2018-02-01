/**
 * Add global method if missing
 *
 * @author Paul Irish - https://github.com/paulirish
 */

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (() => {

        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            (cb => {
                window.setTimeout(cb, 1000 / 60);
            });
    })();
}
