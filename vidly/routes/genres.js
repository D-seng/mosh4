const asyncMiddleware = require('../middleware/asyncMiddleware');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

//To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
// List all genres.

router.get('/', asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));

// Add a genre.
// Second argument is optional middleware.
router.post('/', auth, (async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  const genre = new Genre ({ name: req.body.name });
      await genre.save();
      res.send(genre);
  }
));

// Modify a genre.
router.put('/:id', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, 
    { new: true});
  if (!genre) return res.status(404).send('Genre with given ID not found');
  res.send(genre);
  
});

// Delete a genre.
router.delete('/:id', auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(400).send('Genre not found');
  res.send(genre);
})

router.get('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(400).send('Genre not found');
  res.send(genre);
})

module.exports = router;