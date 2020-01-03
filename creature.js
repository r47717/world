const {random_probability} = require('./utils');

const MAX_LOG_COUNT = 100;
const MAX_AGE = 100;
const MIN_BIRTH_AGE = 20;
const MAX_BIRTH_AGE = 60;

// private creature functions

const actions = ['move', 'eat', 'sleep', 'birth'];

function next_action() {
    const activity_profile_map = {
        'active': [64, 15, 20, 1],
        'slippy': [44, 15, 40, 1],
    };
    const selected_index = random_probability(activity_profile_map[this.activity_profile]);

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
        if (this.energy <= 0 || this.age > MAX_AGE) {
            this.tag('dead');
        }
        if (action === 'birth' && this.age >= MIN_BIRTH_AGE && this.age <= MAX_BIRTH_AGE) {
            return true;
        }

        return false;
    },
    clone() {
        const cl = Object.assign({}, this);
        Object.setPrototypeOf(cl, creature_base);
        cl.age = 0;
        cl.energy = 100;
        cl.logs = [];
        cl.tags = new Set();
        cl.coords = [...this.coords];

        return cl;
    }
};

// creature factory

function creature_factory(type = 'generic') {
    return Object.setPrototypeOf({
        type,
        activity_profile: 'slippy',
        age: 0,
        energy: 100, // %
        tags: new Set(),
        coords: [0, 0, 0, 0],
        logs: [],
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
