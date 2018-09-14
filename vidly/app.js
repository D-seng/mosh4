const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://darren-user:lubimaya1@ds023684.mlab.com:23684/vidly', { useNewUrlParser: true } )
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Not Connected to Database ERROR!'))

app.use(express.json());
app.use(helmet());

console.log('Application Name: ' + config.get('name'));
console.log('Application Host: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled');
} 


// app.use('/api/genres', genres);
// app.use(app.router);
// genres.initialize(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening for vidly on port ${port}...`));

