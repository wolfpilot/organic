const handleGUIEvents = (timestamp, state, input) => {
    if (!timestamp) { return state; }

    let nextState = { ...state };

    console.log(input);

    nextState.isRunning = false;

    return nextState;
};

const getGUIEvents = (topic, input) => {
    // console.log(topic, input);

    if (input === 'pause') {
        return {
            paused: true
        };
    }
};

/**
 * Update and return new state
 * @param {Number} timestamp - The current elapsed time in milliseconds
 * @param {Object} state - Old state
 * @returns {Object} nextState - New state
 */
const update = (timestamp, state) => {
    if (!state.fps || !state.sampleFreq) { return {}; }

    let nextState = { ...state };

    // const input = getGUIEvents();
    // console.log(nextState);

    // nextState.input = handleGUIEvents(timestamp, state, input);
    
    return { ...nextState };
};

const init = () => {
    console.log('Init engine');
};

export { init, update };
