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
let rentalId;

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
    rentalId = rental._id;

  });

  afterEach(async () => {
    await Customer.remove({});
    await Movie.remove({});
    await Rental.remove({});
    await Genre.remove({});
    await server.close();
  });

  describe('POST /', async () => {

    const exec = () => {
      return request(server)
        .post('/api/rentals')
        .set('x-auth-token', token)
        .send({ customerId, movieId });
    };

    it('should return 401 if no token is provided', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if no movieId is provided', async () => {
      movieId = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if no customerId is provided', async () => {
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

  describe('GET /', async () => {
//add another rental for the testing of GET.

    const exec = () => {
      return request(server)
        .get('/api/rentals')
        .set('x-auth-token', token)
    };

    it('should return 401 if no token is provided', async () =>{
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if invalid token is provided', async () => {
      token = 1;
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /:id', () => {

    beforeEach(async () =>{
      customerId = mongoose.Types.ObjectId();
      customer = new Customer({
        _id: customerId,
        name: 'abcde',
        phone: '123456789'
      });
      await customer.save();
    });

    const exec = () => {
      return request(server)
        .put('/api/rentals/' + rentalId)
        .set('x-auth-token', token)
        .send( {customerId: customerId, movieId: movieId });
    };

      it('should return 401 if user provides no token', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it('should return 400 if user provides invalid token', async () => {
        token = 1;
        const res = await exec();
        expect(res.status).toBe(400);
      });


    });

  describe('DELETE /:id', () => {

    const exec = () => {
      return request(server)
      .delete('/api/rentals/' + rentalId)
      .set('x-auth-token', token)
      .send()
    };

    it('should return 404 if invalid rentalId is provided', async () => {
      rentalId = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 400 if valid but non-existent rentalId is provided', async () => {
      rentalId = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return the rental if valid rentalId is passed', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('movie.title', '12345')
      expect(res.body).toHaveProperty('customer.name', 'abcde')
    });

  });
 
});