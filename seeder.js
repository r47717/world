const {creature_factory} = require('./creature');

const tags = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function* creature_generator(amount) {
    for (let i = 0; i < amount; i++) {
        const c = creature_factory();
        c.tag(tags[Math.floor(Math.random() * tags.length)]);
        yield c;
    }
}

module.exports = {
    creature_generator,
};
