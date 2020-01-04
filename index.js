const chalk = require('chalk');
const {creature_generator} = require('./seeder');
const { make_bar } = require('./progress');

const population = 10000;
const world = [...creature_generator(population)];

const days = 10000;

console.log(chalk.bold(`Initial population size: ${world.length}`));
console.log(chalk.bold(`Life days: ${days}`));

const bar = make_bar(days);

for (let i = 0; i < days; i++) {
  const clones = [];
  world.forEach(c => {
    const is_birth = c.act();
    if (is_birth) {
      clones.push(c.clone());
    }
  });
  world.push(...clones);

  const used = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  bar.tick({
    'ram': used,
  });
}

console.log(chalk.bold(chalk.green(`Final population size: ${world.length}`)));

const alive = world.filter((c => !c.filter('dead')));
console.log(chalk.bold(chalk.green(`Alive creatures: ${alive.length}`)));

const dead = world.filter(c => c.filter('dead'));
console.log(chalk.bold(chalk.red(`Dead creatures: ${dead.length}`)));

if (dead.length) {
  //console.log(dead[Math.floor(Math.random() * dead.length)]);
}

if (alive.length) {
  //console.log(alive[Math.floor(Math.random() * alive.length)]);
}
