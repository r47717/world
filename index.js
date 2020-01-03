const chalk = require('chalk');
const {creature_generator} = require('./seeder');
const { make_bar } = require('./progress');

const population = 1000;
const world = [...creature_generator(population)];

const steps = 1000;

console.log(chalk.bold(`Initial population size: ${world.length}`));
console.log(chalk.bold(`Life steps: ${steps}`));

//const bar = make_bar(world.length * steps);

for (let i = 0; i < steps; i++) {
  const clones = [];
  world.forEach(c => {
    const is_birth = c.act();
    if (is_birth) {
      clones.push(c.clone());
    }
    //bar.tick();
  });
  world.push(...clones);
}

console.log(chalk.bold(chalk.green(`Final population size: ${world.length}`)));

const dead = world.filter(c => c.filter('dead')).length;
console.log(chalk.bold(chalk.red(`Dead creatures: ${dead}`)));
console.log(chalk.bold(chalk.green(`Alive creatures: ${world.length - dead}`)));
