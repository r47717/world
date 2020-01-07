const {creature_factory} = require('./creature');
const {events} = require('./events');

function* creature_generator(amount) {
  for (let i = 0; i < amount; i++) {
    yield creature_factory({events});
  }
}

module.exports = {
  creature_generator,
};
