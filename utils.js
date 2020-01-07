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
  for (let i = 0; i < probability.length; i++) {
    cumulative += probability[i];
    if (val <= cumulative) {
      result_index = i;
      break;
    }
  }

  return result_index;
}

function random_number_string(length) {
  return !length ? '' : randomstring.generate({
    charset: 'numeric',
    length,
  });
}

function random_from_to(from, to) {
  return +from + Math.round(Math.random() * (to - from));
}

module.exports = {
  random_probability,
  random_number_string,
  random_from_to,
};
