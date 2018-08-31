const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening for vidly on port ${port}...`))

// Use a local array for now. Add database later.
const genres = [
  { id: 1, name: 'comedy' },
  { id: 2, name: 'drama' },
  { id: 3, name: 'sci-fi' },
  { id: 4, name: 'documentary' },
  { id: 5, name: 'action' },
  { id: 6, name: 'horror' }
]

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

// List all genres.
app.get('/genres', (req, res) => {
  res.send(genres);
});

// Add a genre.
app.post('/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1, 
    name: req.body.name 
  };
  genres.push(genre);
  res.send(genre);
});

// Modify a genre.
app.put('/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send('Genre not found');

  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// Delete a genre.
app.delete('/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send('Genre not found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
  
})