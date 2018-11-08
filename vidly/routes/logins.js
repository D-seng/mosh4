const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let user = new User.findOne({ email: req.data.email });
  
  // if (!user) return res.status(401).send('Invalid email or password.');

  // const validPassword = bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(401).send('Invalid email or password.');
  res.send(user);
});

function validate(req) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(5).max(100).required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;