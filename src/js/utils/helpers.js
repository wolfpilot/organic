const getRandom = (min, max) => {
    return (Math.random() * (max - min)) + min;
};

const valBetween = (v, min, max) => {
    return Math.min(max, Math.max(min, v));
};

export { getRandom, valBetween };
