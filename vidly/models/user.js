const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

// const complexityOptions = {
//   min: 10,
//   max: 100,
//   lowerCase: 1,
//   upperCase: 1,
//   numeric: 1,
//   symbol: 1,
//   requirementCount: 2,
// }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  isAdmin: Boolean
});

// userSchema.methods returns an object.
// Add a key-value pair to that object.
// Use ES5 function notation because in arrow functions,
// 'this' refers to the calling function, not the object.

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { 
    _id: this._id, 
    isAdmin: this.isAdmin 
    }, 
    config.get('jwtPrivateKey'));
  return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(5).max(100).required()
  };
  // console.log(userSchema.password);
  return Joi.validate(user, schema);
  // console.log(userSchema.password);
  // return Joi.validate(userSchema.password, new PasswordComplexity(complexityOptions), (err, value) => {

  }
  
exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;