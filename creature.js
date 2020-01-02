const {random_probability} = require('./utils');
const MAX_LOG_COUNT = 100;

// private creature functions

const actions = ['noop', 'move', 'eat', 'sleep'];

function next_action() {
    const activity_profile_map = {
        'active': [10, 60, 10, 10],
        'slippy': [20, 40, 10, 30],
        'meditative': [30, 30, 10, 30],
    };
    const selected_index = random_probability(activity_profile_map[this.activity_profile]);

    return actions[selected_index];
}

const action_handlers = {
    noop() {
        log.call(this, `noop action performed`);
    },

    eat() {
        log.call(this, `eat action performed`);
        this.health = Math.min(this.health + 1, 100);
    },

    move() {
        log.call(this, `move action performed`);
        this.energy -= 1;
    },

    sleep() {
        log.call(this, `sleep action performed`);
        this.energy = Math.min(100, this.energy + 1);
        this.health = Math.min(this.health + 1, 100);
    },
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
    act() {
        const action = next_action.call(this);
        action_handlers[action].call(this);
        this.age += 1;
    }
};

// creature factory

function creature_factory(type) {
    return Object.setPrototypeOf({
        type: 'generic',
        activity_profile: 'slippy',
        age: 0,
        health: 100, // %
        energy: 100, // %
        max_speed: 10,
        max_appetite: 10,
        tags: new Set(),
        coords: [0, 0, 0, 0],
        logs: [],
    }, creature_base);
}

module.exports = { creature_factory };

