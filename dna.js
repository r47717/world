const {activity_profiles} = require('./activity');
const {random_from_to, random_probability} = require('./utils');

const schema = {
  activity: `number|min:0|max:${activity_profiles.length - 1}`,
  health: `number|min:80|max:100`,
  fertility: 'boolean',
  attractiveness: 'number|min:50|max:100',

  type: (str) => str.match(/^(\w+)/),
  min: (str) => (str.match(/min:(\d+)/i) || [null, null])[1],
  max: (str) => (str.match(/max:(\d+)/i) || [null, null])[1],
};

function create() {
  return {
    activity: random_from_to(schema.min(schema.activity), schema.max(schema.activity)),
    health: random_from_to(schema.min(schema.health), schema.max(schema.health)),
    fertility: random_probability([20, 80]) === 0 ? false : true,
    attractiveness: random_from_to(schema.min(schema.attractiveness), schema.max(schema.attractiveness)),
  };
}

function duplicate(dna) {
  return Object.assign({}, dna);
}

function mutate() {
  const params = Object.keys(schema);
  const mutation_index = random_from_to(0, params.length - 1);

}

module.exports = {
  create,
  duplicate,
};

// tests

if (require.main === module) {
  console.log(schema.type(schema.attractiveness));
  console.log(schema.min(schema.attractiveness));
  console.log(schema.max(schema.attractiveness));

  console.log(schema.type(schema.activity));
  console.log(schema.min(schema.activity));
  console.log(schema.max(schema.activity));

  console.log(schema.type(schema.health));
  console.log(schema.min(schema.health));
  console.log(schema.max(schema.health));

  console.log(schema.type(schema.fertility));
  console.log(schema.min(schema.fertility));
  console.log(schema.max(schema.fertility));

  console.log(create());
}
