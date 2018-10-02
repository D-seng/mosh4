const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening for vidly on port ${port}...`));

// async function createMovie(title, genre, numberInStock, dailyRentalRate){
//   const movie = new Movie( {
//     title: title,
//     genre: genre,
//     numberInStock: numberInStock,
//     dailyRentalRate: dailyRentalRate
//   });
//   const result = await movie.save();
//   console.log(result);
// }

// async function createRental(customerId, movieId) {
//   const rental = new Rental( {
//     customer: customerId,
//     movie: movieId
//   });
//   const result = await rental.save();
//   console.log(result);

  // Next: return the names of the customer and title, etc., of the movie.
// }

// createRental('5b9d64be992bee1c7b5e6331', '5b9eece320ca0a2332ac194a');


// createMovie('Rocky', new Genre({ name: 'Drama' }) , 5, 4)

