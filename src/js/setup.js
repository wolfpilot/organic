const x = window.innerWidth / 2;
const y = window.innerHeight / 2;

const setup = {
    canvas: {
        fill: '#141414'
    },
    creature: {
        size: 50,
        pulses: [
            {
                x: x,
                y: y,
                defaultRadius: 50,
                radius: 50,
                lineWidth: 2,
                strokeStyle: {
                    r: 255,
                    g: 255,
                    b: 255
                }
            }
        ]
    }
};

export { setup };
