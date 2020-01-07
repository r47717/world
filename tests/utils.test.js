const {random_probability, random_from_to, random_number_string} = require('../utils');

test('random_probability', () => {
    const prob = [10, 25, 45, 20];
    const counts = [0, 0, 0, 0];
    const tries = 1000;

    for (let i = 0; i < tries; i++) {
        const index = random_probability(prob);
        //const index = Math.floor(Math.random() * 4)
        counts[index] += 1;
    }

    counts.map(num => Math.round(num / tries * 100));

});

test('random_number_string', () => {
    for (let i = 0; i < 100; i++) {
        const len = Math.round(Math.random() * 100);
        if (!len) continue;
        const str = random_number_string(len);
        expect(str.length).toEqual(len);
    }
});

test('random_number_string, zero length', () => {
    const str = random_number_string(0);
    expect(str).toEqual('');
});

test('random_from_to', () => {
    for (let i = 0; i < 100; i++) {
        const from = Math.round(Math.random() * 10);
        const to = from + Math.round(Math.random() * 20);

        const value = random_from_to(from, to);

        expect(value).toBeGreaterThanOrEqual(from);
        expect(value).toBeLessThanOrEqual(to);
    }
});

test('random_from_to, negative', () => {
    for (let i = 0; i < 100; i++) {
        const from = -Math.round(Math.random() * 10);
        const to = from + Math.round(Math.random() * 20);

        const value = random_from_to(from, to);

        expect(value).toBeGreaterThanOrEqual(from);
        expect(value).toBeLessThanOrEqual(to);
    }
});

test('random_from_to, string inputs', () => {
        const from = '' + Math.round(Math.random() * 10);
        const to = '' + (from + Math.round(Math.random() * 20));

        const value = random_from_to(from, to);

        expect(value).toBeGreaterThanOrEqual(Number(from));
        expect(value).toBeLessThanOrEqual(Number(to));
});
