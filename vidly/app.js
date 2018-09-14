const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

const pword = config.get('db.password');
mongoose.connect('mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly', { useNewUrlParser: true } )
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Not Connected to Database ERROR!'))

app.use(express.json());
app.use(function(req, res, next) {
  console.log('Logging...');
  next();
});
app.use(helmet());

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); can get the ENV this way too.

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled');
} 


app.use('/api/genres', genres);
// app.use(app.router);
// genres.initialize(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening for vidly on port ${port}...`));

