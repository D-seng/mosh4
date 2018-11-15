const request = require('supertest');
const { User } = require('../../models/user');
const { Rental } = require('../../models/rental');
const { Movie } = require('../../models/movie');
const { Customer } = require('../../models/customer');
const { Genre } = require('../../models/genre');
const mongoose = require('mongoose');

describe('/api/rentals', () => {
let token;
let rental;
let customer;
let movie;
let genre;
let movieId;
let customerId;

  beforeEach(async () => {
    server = require('../../app');
    movieId = mongoose.Types.ObjectId();
    customerId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    genre = new Genre({ name: '12345' })
    await genre.save()

    movie = new Movie({
      _id: movieId,
      title: '12345',
      numberInStock: 1,
      dailyRentalRate: 2,
      genre: { name: genre.name }
    });
    await movie.save();

    customer = new Customer({
      _id: customerId,
      name: 'abcde',
      phone: '123456789'
    });
    await customer.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: 'abcde',
        phone: '123456789'
      },
      movie: {
        _id: movieId,
        title: '12345',
        numberInStock: 6,
        dailyRentalRate: 2
      }
    });
    await rental.save();

  });

  afterEach(async () => {
    await Customer.remove({});
    await Movie.remove({});
    await Rental.remove({});
    await Genre.remove({});
    await server.close();
  });

  describe('GET /', async () => {
//add another rental for the testing of GET.
    const exec = () => {
      return request(server)
        .get('/api/rentals')
        .set('x-auth-token', token)
    };

    it('should return 401 if no valid token is provided', async () =>{
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });
  });

  describe('POST /', async () => {

    const exec = () => {
      return request(server)
        .post('/api/rentals')
        .set('x-auth-token', token)
        .send({ customerId, movieId });
    };    

    it('should return 401 if invalid movie is provided', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if invalid movieId is provided', async () => {
      movieId = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid customerId is provided', async () => {
      customerId = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 404 if valid but non-existent movieId is provided', async () => {
      movieId = mongoose.Types.ObjectId();
      // expect(movieId).toBe(1);
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 if valid but non-existent customerId is provided', async () => {
      customerId = mongoose.Types.ObjectId();
      // expect(movieId).toBe(1);
      const res = await exec();
      expect(res.status).toBe(404);
    });

  });

  describe('DELETE /:id', () => {
    let rentalId;
    const exec = () => {
      request(server)
      .delete('/api/rentals/' + rentalId)
      .set('x-auth-token', token)
      .send(rental)
    };
    it('should return 400 if invalid rentalId is provided', () => {
      rentalId = '';
    })
  })
 
});