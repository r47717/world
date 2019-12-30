/**
 * Returns index of random array elem
 * e.g. probability = [10, 20, 30, 40] (sum is 100%)
 * 
 * @param {Array} probability 
 */
function random_probability(probability) {
    const runs = probability.slice().fill(0);
    const total_runs = 100;

    for (let i = 0; i < total_runs; i++) {
        const index = Math.floor(Math.random() * probability.length);
        runs[index] += 1;
    }

    let max = -1;
    let max_index = 0;
    for (let i = 0; i < runs.length; i++) {
        const val = runs[i] / 100 * probability[i];
        if (val > max) {
            max = val;
            max_index = i;
        }
    }

    return max_index;
}

module.exports = {
    random_probability,
}

// tests

if (require.main === module) {
    const prob = [0, 0, 50, 50];
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < 1000; i++) {
        // const index = random_probability(prob);
        const index = Math.floor(Math.random() * 4)
        counts[index] += 1;
    }
    console.log(prob);
    console.log(counts);
}

