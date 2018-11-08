const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

var db;
var dbSource;
var pword;

dbSource = 'compass';
// dbSource = 'mLab'

module.exports = function () {
  
  const mode = process.env.NODE_ENV;

  console.log("Mode: " + mode);
  console.log("DB Source: " + dbSource);
  if (mode === 'test') {
      if (dbSource === 'mLab') {
        console.log('DB source branch: ' + dbSource)
        pword = config.get('db.testpassword');
        console.log('Password is: ' + pword + ' DON\'T DO THIS IN REAL LIFE!');
        db = 'mongodb://darren-user:' + pword + '@ds129233.mlab.com:29233/vidly_tests';
      } else {

        db = 'mongodb://localhost/vidly_test';
      }

  } else {
    if (dbSource === 'mLab') {
      pword = config.get('db.dbpassword');
      console.log('Password is: ' + pword + ' DON\'T DO THIS IN REAL LIFE!');
      db = 'mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly'
    } else {
      db = 'mongodb://localhost/vidly';
    }
  }
  //'mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly'

  console.log('Database is: ' + db);
  console.log('Connection string (DON\'T DO THIS IN REAL LIFE!): ' + db);


  mongoose.connect(db, { useNewUrlParser: true })
  .then(() => winston.info(`Connected to ${db}...`));
}
