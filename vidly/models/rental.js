const Joi = require('joi');
const mongoose = require('mongoose');
const { movieSchema } = require('./movie');
// const { Customer } = require('./customer');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  movie: {
    type: movieSchema,
    required: true
  },
  dateCheckedOut: Date
})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customer: Joi.string().required(),
    movieId: Joi.string().required(),
    dateCheckedOut: Joi.date().required()
  }
  return Joi.validate(rental, schema)
}

exports.Rental = Rental;
exports.validate = validateRental;
