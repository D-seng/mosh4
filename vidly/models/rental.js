const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
// Returns a function, so we:
  // 1-pass a reference to the Joi module
  // 2-set the objectId property on Joi to the function


// const { movie } = require('./movie');
// const { Customer } = require('./customer');


// If we're going to use a new schema, do we enforce
// integrity at the input level?
// Define a different customerSchema here because the main customer
// schema can have a lot of properties. We only want a few properties.
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true
  }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  }
});

const rentalSchema = new mongoose.Schema({
  customer: customerSchema,
  movie: movieSchema,
  dateCheckedOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: Date,
  rentalFee: {
    type: Number,
    min: 0,
    max: 50
  }
});
   
const Rental = mongoose.model('Rental', rentalSchema);

// Don't validate dateCheckedOut and dateReturned because these
// will be set by the server, not by the user.
function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  }
  return Joi.validate(rental, schema)
}

exports.Rental = Rental;
exports.validate = validateRental;
