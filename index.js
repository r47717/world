// Crockford coding style

const {creatureGenerator} = require('./seeder');

const population = 100;
const world = [...creatureGenerator(population)];

console.log(world.length);

const filtered = world.filter(c => c.filter('january'));
console.log(filtered.length);

world.forEach(c => c.act());

console.log(world[0]);

