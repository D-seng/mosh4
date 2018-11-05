const validateObjectId = require('../middleware/validateObjectId');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const validate = require('../middleware/validate')
const mongoose = require('mongoose');
const Joi = require('joi');

//To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
// List all genres.

router.get('/', asyncMiddleware(async (req, res) => {
  // throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));

// Add a genre.
// Second argument is optional middleware.
router.post('/', [auth, validate(validateGenre)], async (req, res) => {
 
  const genre = new Genre ({ name: req.body.name });
      await genre.save();
      res.send(genre);
  }
);

// Modify a genre.
router.put('/:id', [auth, validate(validateGenre)], async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, 
    { new: true});
  if (!genre) return res.status(404).send('Genre with given ID not found');
  await genre.save();
  res.status(200).send(genre);
  
});

// Delete a genre.
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  res.status(200).send(genre);
  // return res.status(404).send();
})

//[auth, admin],
router.get('/:id', validateObjectId, async (req, res) => {

  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  res.send(genre);
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;