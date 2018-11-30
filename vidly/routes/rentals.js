const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const Fawn = require('fawn');
const auth = require('../middleware/auth')
const validateObjectId = require('../middleware/validateObjectId');
const winston = require('winston');
// Organize routes in CRUD order: post, get, put, delete.

Fawn.init(mongoose);
  // To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
    // List all rentals.

// Add a rental.
router.post('/', auth, async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Make sure the movie and customer exist before combining them
  // to create a rental.
  
  const movie = await Movie.findById(req.body.movieId);
  // console.log(req.body.movieId);
  if (!movie) return res.status(404).send('Movie not found.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send('Invalid customer.');

  // Use only two properties of the embedded genre object because it could have other properties
  // and because it will definitely have a version id (which we don't want)
  // created by MongoDB. 
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

try {
  new Fawn.Task()
    .save('rentals', rental)
    .update('movies', { _id: movie._id }, {
      $inc: { numberInStock: -1 }
    })
    .run();
  } catch(ex) {
  res.status(500).send("Rental didn't save");
  }

  res.send(rental);
}
);

// Get all rentals.
router.get('/', auth, async (req, res) => {
  const rentals = await Rental.find().sort('-dateCheckedOut');
  res.send(rentals);
});

// Get a rental.
router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(400).send('Rental not found');
  res.send(rental);
})

// Modify a rental.
router.put('/:id', auth, async (req, res) => {
 
  winston.info("RENTAL PARAMS.ID: " + req.params.id);
  const { error } = validate(req.body);
  if (error) return res.status(418).send(error.details[0].message);

  const rental = await Rental.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true });
  if (!rental) return res.status(404).send('Rental with given ID not found');
  res.send(rental);

});

// Delete a rental.
router.delete('/:id', validateObjectId, async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  // const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(400).send('Rental not found');
  res.send(rental);
})



module.exports = router