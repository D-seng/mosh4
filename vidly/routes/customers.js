const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

//To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
// List all genres.
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// Add a genre.
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = new Customer(
    { name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold 
    });
  customer = await customer.save();
  res.send(customer);
}
);

// Modify a genre.
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true });
  if (!customer) return res.status(404).send('Customer with given ID not found');
  res.send(customer);
});

// Delete a genre.
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(400).send('Customer not found');
  res.send(customer);
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send('Customer not found');
  res.send(customer);
})

module.exports = router;
