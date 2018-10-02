const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const { User, validate } = require('../models/user');

// Get current user.
// Because it's middleware, auth will run before we get
// to async (req, res).

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

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
 
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;