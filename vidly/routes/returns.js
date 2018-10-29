const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const moment = require('moment');
const Joi = require('joi');

router.post('/', [auth, validate(validateReturn)], async (req, res) => {

  const rental = await Rental.findOne({ 
    'customer._id': req.body.customerId, 
    'movie._id': req.body.movieId });

  if (!rental) return res.status(404).send('This customer did not rent this movie.');
  if (rental.dateReturned) return res.status(400).send('Rental already processed.');

  const dateReturned = Date.now();
  rental.dateReturned = dateReturned;

  const numberOfDays = moment().diff(rental.dateCheckedOut, 'days');
  rental.rentalFee = numberOfDays * rental.movie.dailyRentalRate;
  
  await Movie.update({ _id: rental.movie._id }, { 
    $inc: { numberInStock: 1 }
  });
  await rental.save();
  return res.status(200).send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;