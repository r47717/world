const {creature_factory} = require('./creature');

function* creature_generator(amount) {
    for (let i = 0; i < amount; i++) {
        const c = creature_factory();
        yield c;
    }
}

module.exports = {
    creature_generator,
};
