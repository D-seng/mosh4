const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');
const auth = require('../middleware/auth');
const winston = require('winston');

//To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.

// Add a movie.
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  winston.info(req.body);
  // return res.status(418).send();
  const genre = await Genre.findById(req.body.genreId);
  winston.info('const genre: ' + genre);
  if (!genre) return res.status(418).send('Invalid genre.');

  // Use only two properties of the embedded genre object because it could have other properties
  // and because it will definitely have a version id (which we don't want)
  // created by MongoDB. 
  const movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate});
  await movie.save();
  res.send(movie);
}
);

// List all genres.
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

// Modify a movie.
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true });
  if (!movie) return res.status(404).send('Movie with given ID not found');
  res.send(movie);

});

// Delete a movie.
router.delete('/:id', auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(400).send('Movie not found');
  // res.send(movie);
})

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send('Genre not found');
  res.send(movie);
})

module.exports = router;