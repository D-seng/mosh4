const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const { Movie } = require('./models/movie');
const express = require('express');
const app = express();
const { Rental } = require('./models/rental')

const pword = config.get('db.password');

if (!config.get('jwtPrivateKey')) {
  console.log('ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// const db = 'local'

mongoose.connect('mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly', { useNewUrlParser: true } )
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Not Connected to Database ERROR!'));

// connect('local');

app.use(express.json());
app.use(function(req, res, next) {
  console.log('Logging...');
  next();
});
app.use(helmet());

console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail password: ' + config.get('mail.password'));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); can get the ENV this way too.

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
} 

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// app.use(app.router);
// genres.initialize(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening for vidly on port ${port}...`));

async function createMovie(title, genre, numberInStock, dailyRentalRate){
  const movie = new Movie( {
    title: title,
    genre: genre,
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate
  });
  const result = await movie.save();
  console.log(result);
}

async function createRental(customerId, movieId) {
  const rental = new Rental( {
    customer: customerId,
    movie: movieId
  });
  const result = await rental.save();
  console.log(result);

  // Next: return the names of the customer and title, etc., of the movie.
}

// createRental('5b9d64be992bee1c7b5e6331', '5b9eece320ca0a2332ac194a');


// createMovie('Rocky', new Genre({ name: 'Drama' }) , 5, 4)

