const chalk = require('chalk');
const {creature_generator} = require('./seeder');
const { make_bar } = require('./progress');

const population = 10000;
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

const dead = world.filter(c => c.filter('dead'));
console.log(chalk.bold(chalk.red(`Dead creatures: ${dead.length}`)));

if (dead.length) {
  console.log(dead[Math.floor(Math.random() * dead.length)]);
}

const alive = world.filter((c => !c.filter('dead')));
console.log(chalk.bold(chalk.green(`Alive creatures: ${alive.length}`)));

if (alive.length) {
  console.log(alive[Math.floor(Math.random() * alive.length)]);
}
