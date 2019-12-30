// Crockford coding style

const {creatureGenerator} = require('./seeder');

const population = 100;
const world = [...creatureGenerator(population)];

console.log(world.length);

const filtered = world.filter(c => c.filter('march'));
console.log(filtered.length);

