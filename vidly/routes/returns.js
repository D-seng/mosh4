const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');

router.post('/', auth, async (req, res) => {
  if (!req.body.customerId) {
    return res.status(400).send('No customer id provided.');
  }
  if (!req.body.movieId) {
    return res.status(400).send('No customer id provided.');
  }

  const rental = await Rental.findOne({ 
    'customer._id': req.body.customerId, 
    'movie._id': req.body.movieId });

  if(!rental) {
    return res.status(404).send('This customer did not rent this movie.');
  }
  if (rental.dateReturned) {
    return res.status(400).send('Rental already processed.');
  }
});

module.exports = router;