const x = window.innerWidth / 2;
const y = window.innerHeight / 2;

const setup = {
    engine: {
        fps: 30,
        sampleFreq: 1000
    },
    canvas: {
        fill: '#141414'
    },
    creature: {
        size: 50,
        pulses: [
            {
                prevTick: 0,
                x: x,
                y: y,
                defaultRadius: 50,
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
