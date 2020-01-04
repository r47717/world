const uuid = require('uuid/v1');
const {random_probability, random_number_string} = require('./utils');

const DNA_SIZE = 100;
const MAX_LOG_COUNT = 100;
const LOG_ENABLED = false;
const MAX_AGE = 100;
const MIN_BIRTH_AGE = 20;
const MAX_BIRTH_AGE = 60;
const MAX_BIRTH_RATE = 3;

// private creature functions

const actions = ['move', 'eat', 'sleep', 'birth'];
const activity_profile_map = {
    'active': [64, 15, 20, 3],
    'sleepy': [44, 15, 40, 2],
};

function next_action() {
    const selected_index = random_probability(activity_profile_map[this.activity_profile]);
    return actions[selected_index];
}

const action_handlers = {
    eat() {
        LOG_ENABLED && log.call(this, `eat action performed`);
        this.energy += 3;
    },

    move() {
        LOG_ENABLED && log.call(this, `move action performed`);
        this.energy -= 1;
    },

    sleep() {
        LOG_ENABLED && log.call(this, `sleep action performed`);
        this.energy += 1;
    },
    birth() {
        LOG_ENABLED && log.call(this, `birth action performed`);
        this.energy -= 2;
    }
};


function log(message) {
    this.logs.push(`${new Date()}: ${message}`);
    if (this.logs.length > MAX_LOG_COUNT) {
        this.logs.shift();
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
        if (this.energy <= 0 || this.age > MAX_AGE) {
            this.tag('dead');
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
        return creature_factory(this);
    }
};

// creature factory

function creature_factory(parent = null, type = 'generic') {
    return Object.setPrototypeOf({
        type,
        id: uuid(),
        dna: parent ? parent.dna : random_number_string(DNA_SIZE),
        activity_profile: parent
            ? parent.activity_profile
            : Object.keys(activity_profile_map)[Math.floor(Math.random() * 2)],
        age: 0,
        energy: 100,
        tags: new Set(),
        coords: parent ? [...parent.coords] : [0, 0, 0, 0],
        logs: [],
        stat: Object.assign({},
            ...actions.map(action => ({ [action]: 0 }))
        ),
        parent
    }, creature_base);
}

module.exports = { creature_factory };

// tests

if (require.main === module) {
    const c1 = creature_factory();
    const c2 = c1.clone();

    c1.act();
    c1.act();
    c1.act();

    console.log(c1);
    console.log(c2);
}
