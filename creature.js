// Crockford coding style


// private creature functions

function eat() {

}

function move() {

}

function next_action() {
    const actions = ['noop', 'move', 'eat', 'sleep'];
    const activity_profile = {
        'active': [10, 60, 10, 10],
        'slippy': [20, 40, 10, 30],
        'meditative': [30, 30, 10, 30],
    };
    const selected = 

}

const creature_base = {
    tag(...tags) {
        tags.forEach(val => this.tags.add(val));
    },
    filter(...tags) {
        return tags.every(item => this.tags.has(item));
    },
    act() {
        const action = next_action.call(this);
        // ...
    }
};

function creature_factory(type) {
    return Object.setPrototypeOf({
        type: 'generic',
        size: 0,
        tags: new Set(),
        coords: [0, 0, 0, 0],
        energy: 100, // %
        max_speed: 10,
        max_appetite: 10,
        activity_profile: 'active',
    }, creature_base);
}

module.exports = { creature_factory };

