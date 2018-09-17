const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const { Movie, validate } = require('./models/movie');
const express = require('express');
const app = express();
const { Genre } = require('./models/genre')

const pword = config.get('db.password');

const db = "local"



// function connect(db) {
//   const connectionString = if (db === 'local') {
//     'mongodb://localhost'
//   } else {
//     'mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly'
//   }

mongoose.connect('mongodb://darren-user:' + pword + '@ds023684.mlab.com:23684/vidly', { useNewUrlParser: true } )
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Not Connected to Database ERROR!'))
}
connect('local');

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
  startupDebugger('Morgan enabled...');
} 

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
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

createMovie('Rocky', new Genre({ name: 'Drama' }) , 5, 4)