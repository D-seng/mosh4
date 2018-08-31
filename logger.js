const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit('messageLogger', { id: 1, value: 'joe' });
}
}

module.exports = Logger;
