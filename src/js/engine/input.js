// Utils
import * as Rx from 'rxjs';

/**
 * Update and return new state
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 */
const update = (timestamp, state) => {
    let nextState = { ...state };

    return { ...nextState };
};

/**
 * Bind listeners
 */
const _addEventListeners = () => {
    const moveStream$ = Rx.fromEvent(document, 'mousemove');

    moveStream$.subscribe(
        e => console.log(e.clientX)
    );
};

const init = () => {
    _addEventListeners();
};

export { init, update };
