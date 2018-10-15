const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/config')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

app.use(helmet());


// if (app.get('env') === 'development') {
//   app.use(morgan('tiny'));
//   startupDebugger('Morgan enabled...');
// } 

// if (!module.parent) {
  // console.log("Port: " + process.env.PORT);
// if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => winston.info(`Listening for vidly on port ${port}...`));
// }
  // const server = app.listen(3000);
// }
module.exports = server;
