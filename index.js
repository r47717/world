const chalk = require('chalk');
const {creature_generator} = require('./seeder');
const { make_bar } = require('./progress');

const population = 100_000;
const world = [...creature_generator(population)];

console.log(chalk.bold(chalk.green(`Population size: ${world.length}`)));

const bar = make_bar(world.length);

world.forEach(c => {
  c.act();
  bar.tick();
});
