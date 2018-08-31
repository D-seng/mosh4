const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('messageLogger', (arg) => {
  console.log(arg);
});

logger.log('message');