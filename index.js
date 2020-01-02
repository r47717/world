const chalk = require('chalk');
const {creature_generator} = require('./seeder');
const { make_bar } = require('./progress');

const population = 1000;
const world = [...creature_generator(population)];

const steps = 1000;

console.log(chalk.bold(chalk.green(`Population size: ${world.length}`)));
console.log(chalk.bold(chalk.green(`Life steps: ${steps}`)));

const bar = make_bar(world.length * steps);

for (let i = 0; i < steps; i++) {
  world.forEach(c => {
    c.act();
    bar.tick();
  });
}

const dead = world.filter(c => c.filter('dead')).length;
console.log(chalk.bold(chalk.red(`Dead creatures: ${dead}`)));
