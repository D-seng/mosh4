const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const winston = require('winston');
// const mongoose = require('mongoose');
const router = express.Router();
const { User, validate } = require('../models/user');
const validateObjectId = require('../middleware/validateObjectId');

// Get current user.
// Because it's middleware, auth will run before we get
// to async (req, res).

//auth,
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/:id', [validateObjectId, auth], async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

  // const salt = await bcrypt.genSalt(10);
  // const hashed = await bcrypt.hash('1234', salt)
// Add a user.
router.post('/', async (req, res) => {
  console.log('post');
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

    // winston.info(req.body.password);
  let user = await User.findOne({ email: req.body.email})

  if (user) return res.status(400).send('User already exists.')

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
 
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;