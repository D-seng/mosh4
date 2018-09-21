const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const { User, validate } = require('../models/user');



// Add a user.
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(11);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  
  let user = await User.findOne({ email: req.body.email})

  if (user) return res.status(400).send('User already exists.')

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  
  await user.save();
 
  res.send(_.pick(user, ['name', 'email']));
});

module.exports = router;