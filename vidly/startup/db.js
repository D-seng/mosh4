const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  const pword = config.get('db.password');
  
  mongoose.connect('mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly', { useNewUrlParser: true })
  .then(() => winston.log('Connected to Database...'));
}
