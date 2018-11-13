const request = require('supertest');
const { User } = require('../../models/user');
const { Rental } = require('../../models/rental');
const { Movie } = require('../../models/movie');
const { Customer } = require('../../models/customer');
const mongoose = require('mongoose');

describe('/api/rentals', () => {
let token;
let rental;
let customer;
let movie;
let customer2;
let movie2;

  const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: true
    }
  });

  const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 50
    }
  });

  const rentalSchema = new mongoose.Schema({
    customer: customerSchema,
    movie: movieSchema,
    dateCheckedOut: {
      type: Date,
      required: true,
      default: Date.now()
    },
    dateReturned: Date,
    rentalFee: {
      type: Number,
      min: 0,
      max: 50
    }
  });

  beforeEach(async () => {
    server = require('../../app');
    token = new User().generateAuthToken();
    customer = new Customer( { name: 'abcde', phone: '123456789'});
    movie = new Movie ( { title: 'aaaaa', dailyRentalRate: 1 })
    customer2 = new Customer({ name: 'abcde2', phone: '123456780' });
    movie2 = new Movie({ title: 'aaaaa2', dailyRentalRate: 2 });
    rental = new Rental ( {customer, movie });
    rental2 = new Rental({ customer2, movie2 });
    await rental.save();
    await rental2.save();

  });
  afterEach(async () => {
    await server.close();
    await Customer.remove({});
    await Movie.remove({});
    await Rental.remove({});
  })

  describe('GET /', () => {

    const exec = () => {
      return request(server)
        .get('/api/rentals')
        .set('x-auth-token', token)
    };

    it('should return 401 if no valid token is provided', async () =>{
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    })

    
  });
 
});