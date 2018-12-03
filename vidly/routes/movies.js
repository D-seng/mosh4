const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');
const auth = require('../middleware/auth');
const validationMware = require('../middleware/validate')
const winston = require('winston');
const Joi = require('joi');

//To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.

// Add a movie.
router.post('/', auth, async (req, res) => {

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(418).send('Invalid genre.');

  // winston.info('TITLE FROM POST REQ.BODY: ' + req.body.title);
  // winston.info('GENREID FROM POST REQ.BODY: ' + req.body.genreId);
  // winston.info('GENRENAME FROM POST REQ.BODY: ' + req.body.genreName);
  // winston.info('NUMBERINSTOCK FROM POST REQ.BODY: ' + req.body.numberInStock);
  // winston.info('DAILYRENTALRATE FROM POST REQ.BODY: ' + req.body.dailyRentalRate);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Use only two properties of the embedded genre object because it could have other properties
  // and because it will definitely have a version id (which we don't want)
  // created by MongoDB. 
 
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: req.body.genreId,
      name: req.body.genreName
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  winston.info("MOVIE FROM ROUTE");
  winston.info(movie);
  
  res.send(movie);
}
);

// List all genres.
router.get('/', auth, async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

// Modify a movie.
router.put('/:id', validationMware(validateMovie), async (req, res) => {

  const movie = await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title },
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

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(movie, schema);
};

module.exports = router;