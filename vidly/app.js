const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true } )
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Not Connected to Database ERROR!'))

app.use(express.json());
app.use('/api/genres', genres);
// app.use(app.router);
// genres.initialize(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening for vidly on port ${port}...`));

// mongoose.set('debug', true);
