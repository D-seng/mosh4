const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');

router.post('/', auth, async (req, res) => {
  if (!req.body.customerId) return res.status(400).send('No customer id provided.');
  if (!req.body.movieId) return res.status(400).send('No customer id provided.');

  const rental = await Rental.findOne({ 
    'customer._id': req.body.customerId, 
    'movie._id': req.body.movieId });

  if (!rental) return res.status(404).send('This customer did not rent this movie.');
  if (rental.dateReturned) return res.status(400).send('Rental already processed.');
 
  const dateReturned = Date.now();;
  rental.dateReturned = dateReturned;

  // const dummyDate = Date(2018, 1, 5);
  // const dummyRate = 3;

  // const numberOfDays = dateReturned - dummyDate;
  // // const dailyRentalRate = rental('movie._dailyRentalRate');
  // rental.rentalFee = numberOfDays * dummyRate;
    rental.rentalFee = rental.movie.dailyRentalRate * 3;
  await rental.save();
 
  return res.status(200).send();
});

module.exports = router;