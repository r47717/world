const randomstring = require('randomstring');

/**
 * Returns index of random array elem
 * e.g. probability = [10, 20, 30, 40] (sum is 100%)
 *
 * @param {Array} probability
 */
function random_probability(probability) {
    const sum = probability.reduce((acc, item) => acc + item);
    const val = Math.round(Math.random() * sum);

    let result_index = 0;
    let cumulative = 0;
    for(let i = 0; i < probability.length; i++) {
        cumulative += probability[i];
        if (val <= cumulative) {
            result_index = i;
            break;
        }
    }

    return result_index;
}

function random_number_string(length) {
    return randomstring.generate({
        charset: 'numeric',
        length
    });
}

module.exports = {
    random_probability,
    random_number_string,
};

// tests

if (require.main === module) {
    const prob = [0, 25, 25, 50];
    const counts = [0, 0, 0, 0];
    const tries = 1000;
    for (let i = 0; i < tries; i++) {
        const index = random_probability(prob);
        //const index = Math.floor(Math.random() * 4)
        counts[index] += 1;
    }
    console.log(prob);
    console.log(counts);
    console.log(counts.map(num => Math.round(num / tries * 100)));

    console.log(random_number_string(30));
    console.log(random_number_string(30));
    console.log(random_number_string(30));
}

