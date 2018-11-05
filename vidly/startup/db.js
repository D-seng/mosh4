const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

var db;
module.exports = function () {
  
  const mode = process.env.NODE_ENV;
  console.log(mode);
  if (mode === 'test') {
    // 'mongodb://localhost/playground', { useNewUrlParser: true }
    // let pword = config.get('db.testpassword');
    // console.log('Password is: ' + pword + ' DON\'T DO THIS IN REAL LIFE!');
    // db = 'mongodb://darren-user:' + pword + '@ds129233.mlab.com:29233/vidly_tests';
    db = 'mongodb://localhost/vidly_test';
  } else {
    // let pword = config.get('db.dbpassword');
    // console.log('Password is: ' + pword + ' DON\'T DO THIS IN REAL LIFE!');
    // db = 'mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly'
    db = 'mongodb://localhost/vidly';
  }
  //'mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly'

  console.log(db);
  console.log('Connection string (DON\'T DO THIS IN REAL LIFE!): ' + db);
  mongoose.connect(db, { useNewUrlParser: true })
  .then(() => winston.info(`Connected to ${db}...`));
}
