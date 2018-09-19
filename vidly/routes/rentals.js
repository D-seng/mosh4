const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');

  // To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
    // List all rentals.
  router.get('/', async (req, res) => {
      const rentals = await Rental.find().sort('-dateCheckedOut');
      res.send(rentals);
    });

// Add a rental.
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Make sure the movie and customer exist before combining them
  // to create a rental.
  const movie = await Movie.findById(req.body.movieId);
  console.log(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  // Use only two properties of the embedded genre object because it could have other properties
  // and because it will definitely have a version id (which we don't want)
  // created by MongoDB. 
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
}
);

// Modify a rental.
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true });
  if (!movie) return res.status(404).send('Movie with given ID not found');
  res.send(movie);

});

// Delete a rental.
router.delete('/:id', async (req, res) => {
  const movie = await Genre.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(400).send('Movie not found');
  res.send(movie);
})

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send('Genre not found');
  res.send(movie);
})

module.exports = router