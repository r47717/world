const {activity_profiles} = require('./activity');
const {random_from_to, random_probability} = require('./utils');

const schema = {
  activity: `number|min:0|max:${activity_profiles.length - 1}|mutable:10`,
  health: `number|min:80|max:100|mutable:60`,
  fertility: 'boolean|mutable:10',
  attractiveness: 'number|min:50|max:100|mutable:20',
};

const schema_ops = {
  type: (str) => str.match(/^(\w+)/)[0],
  min: (str) => (str.match(/min:(\d+)/) || [null, null])[1],
  max: (str) => (str.match(/max:(\d+)/) || [null, null])[1],
  mutable: (str) => (str.match(/mutable:(\d+)/) || [null, null])[1],
  random: (prop) => random_from_to(schema_ops.min(schema[prop]),
      schema_ops.max(schema[prop])),
};

function create() {
  return {
    activity: schema_ops.random('activity'),
    health: schema_ops.random('health'),
    fertility: random_probability([20, 80]) === 0 ? false : true,
    attractiveness: schema_ops.random('attractiveness'),
  };
}

function duplicate(dna) {
  return Object.assign({}, dna);
}

function mutate(dna) {
  const new_dna = Object.assign({}, dna);
  const props = Object.keys(schema);
  const probs = props.map(prop => Number(schema_ops.mutable(schema[prop])));

  const mutation_index = random_probability(probs);
  const prop = props[mutation_index];
  const prop_type = schema_ops.type(schema[prop]);

  switch (prop_type) {
    case 'boolean':
      new_dna[prop] = !new_dna[prop];
      break;
    case 'number':
      new_dna[prop] = schema_ops.random(prop);
      break;
  }

  return new_dna;
}

module.exports = {
  create,
  duplicate,
  mutate,
};

// tests

if (require.main === module) {
  console.log(schema_ops.type(schema.attractiveness));
  console.log(schema_ops.min(schema.attractiveness));
  console.log(schema_ops.max(schema.attractiveness));

  console.log(schema_ops.type(schema.activity));
  console.log(schema_ops.min(schema.activity));
  console.log(schema_ops.max(schema.activity));

  console.log(schema_ops.type(schema.health));
  console.log(schema_ops.min(schema.health));
  console.log(schema_ops.max(schema.health));

  console.log(schema_ops.type(schema.fertility));
  console.log(schema_ops.min(schema.fertility));
  console.log(schema_ops.max(schema.fertility));

  const dna = create();
  console.log(mutate(dna));
  console.log(mutate(dna));
  console.log(mutate(dna));
  console.log(mutate(dna));
  console.log(mutate(dna));
  console.log(mutate(dna));
}
