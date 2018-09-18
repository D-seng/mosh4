const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');

  // To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
    // List all rentals.
  router.get('/', async (req, res) => {
      const rentals = await Rental.find().sort('title');
      res.send(rentals);
    });

// Add a genre.
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Make sure the movie and customer exist before combining them
  // to create a rental.
  let movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  // Use only two properties of the embedded genre object because it could have other properties
  // and because it will definitely have a version id (which we don't want)
  // created by MongoDB. 
  movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
}
);

// Modify a genre.
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true });
  if (!movie) return res.status(404).send('Movie with given ID not found');
  res.send(movie);

});

// Delete a genre.
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