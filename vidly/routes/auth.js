const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const { User } = require('../models/user');


router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const validPassord = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
});


function validate(req) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(5).max(100).required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;