const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { genreSchema } =  require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    genreName: Joi.string().min(5).max(50),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required()

  };
  return Joi.validate(movie, schema);
}

// numberInStock: Joi.number().min(0).max(255).required(),
//   dailyRentalRate: Joi.number().min(0).max(255).required()
// genreId: Joi.objectId().required,()
exports.Movie = Movie;
exports.validate = validateMovie;
exports.movieSchema = movieSchema;