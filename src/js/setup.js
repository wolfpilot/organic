const x = window.innerWidth / 2;
const y = window.innerHeight / 2;

const setup = {
    input: {
        pause: false
    },
    engine: {
        isPaused: false,
        fps: 30,
        sampleFreq: 1000
    },
    gui: {
        pause: false,
        pulse: {
            speed: 2000,
            pattern: 'single'
        }
    },
    canvas: {
        fill: '#141414'
    },
    creature: {
        pulses: [
            {
                prevTick: 0,
                x: x,
                y: y,
                startRadius: 50,
                endRadius: 0,
                radius: 50,
                defaultOpacity: 0,
                lineWidth: 2,
                strokeStyle: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 0
                }
            }
        ]
    }
};

export { setup };
