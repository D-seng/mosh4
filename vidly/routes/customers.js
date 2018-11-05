const mongoose = require('mongoose');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const winston = require('winston');
const Joi = require('joi');
const validate = require('../middleware/validate');

//To render html, see Express - Advanced Topics, Lesson 9. It uses Pug as an example, but see how to use Vue.
// List all customers.
router.get('/', auth, async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Customer not found');
  res.send(customer);
})

// Add a customer.
router.post('/', [auth, validate(validateCustomer)], async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer(
    { name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold 
    });
  customer = await customer.save();
  res.send(customer);
}
);

// Modify a customer.*****
router.put('/:id', [auth, validate(validateCustomer)], async (req, res) => {
  // const { error } = validateCustomer(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true });
  if (!customer) return res.status(404).send('Customer with given ID not found');
  res.send(customer);
});

// Delete a customer.
router.delete('/:id', [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(400).send('Customer not found');
  res.send(customer);
})

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
}

module.exports = router;
