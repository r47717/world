const uuid = require('uuid/v1');
const {random_probability, random_from_to} = require('./utils');
const {actions, activity_profile_map, activity_profiles} = require('./activity');
const dna = require('./dna');

const COORDS_DIM = 5;
const MAX_LOG_COUNT = 100;
const LOG_ENABLED = false;
const MAX_AGE = 100;
const MIN_BIRTH_AGE = 20;
const MAX_BIRTH_AGE = 60;
const MAX_BIRTH_RATE = 3;
const MUTATION_RATE = 0.001; // % of all actions

// private creature functions

function next_action() {
  const selected_index = random_probability(activity_profile_map[activity_profiles[this.dna.activity]]);
  return actions[selected_index];
}

const action_handlers = {
  eat() {
    log.call(this, `eat action performed`);
    this.energy += 3;
  },

  move() {
    log.call(this, `move action performed`);
    this.energy -= 1;
  },

  sleep() {
    log.call(this, `sleep action performed`);
    this.energy += 1;
  },

  birth() {
    log.call(this, `birth action performed`);
    this.energy -= 2;
  },
};

function log(message) {
  if (LOG_ENABLED) {
    this.logs.push(`${new Date()}: ${message}`);
    if (this.logs.length > MAX_LOG_COUNT) {
      this.logs.shift();
    }
  }
}

// creature prototype (public methods)

const creature_base = {
  tag(...tags) {
    tags.forEach(val => this.tags.add(val));
  },

  filter(...tags) {
    return tags.every(item => this.tags.has(item));
  },

  is_dead() {
    return this.tags.has('dead');
  },

  act() {
    if (this.is_dead()) {
      return false;
    }

    this.age += 1;
    const action = next_action.call(this);
    action_handlers[action].call(this);
    this.stat[action] += 1;

    if (Math.random() * 100 < MUTATION_RATE) {
      this.dna = dna.mutate(this.dna);
      this.events.emit('mutation');
    }

    if (this.energy <= 0 || this.age > MAX_AGE) {
      this.tag('dead');
      this.events.emit('dead');
    }
    if (action === 'birth' &&
        this.age >= MIN_BIRTH_AGE &&
        this.age <= MAX_BIRTH_AGE &&
        this.stat.birth <= MAX_BIRTH_RATE
    ) {
      return true;
    }

    return false;
  },

  clone() {
    return creature_factory({parent: this, events: this.events});
  },
};

// creature factory

function creature_factory({parent = null, type = 'generic', events}) {
    events.emit('creature generated');

    return Object.setPrototypeOf({
    type,
    id: uuid(),
    dna: parent ? dna.duplicate(parent.dna) : dna.create(),
    age: 0,
    energy: 100,
    tags: new Set(),
    coords: parent ? [...parent.coords] : new Array(COORDS_DIM).fill(0),
    logs: [],
    events,
    stat: Object.assign({},
        ...actions.map(action => ({[action]: 0})),
    ),
    parent,
  }, creature_base);
}

module.exports = {creature_factory};

if (require.main === module) {
  const {events} = require('./events');
  const c1 = creature_factory({events});
  console.log(c1);
  c1.act();
}
