const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const mongoose = require('mongoose');
const moment = require('moment');

describe('api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  let movie;

  beforeEach(async () => {
    server = require('../../app');
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie ({
      _id: movieId,
        title: '12345',
        numberInStock: 1,
        dailyRentalRate: 2,
        genre: { name: '12345'}
    });
    await movie.save();

     rental = new Rental({ 
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345' },
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
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId });
  };
  
  it('should return 401 if client is not logged in', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);   
  });

  it('should return 400 if customerId is not provided', async () => {
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if movieId is not provided', async () => {
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 404 if no rental is found for the customer/movie combination', async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it('should return 400 if rental is already processed', async () => {
    rental.dateReturned = Date.now();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if valid request', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should set the return date if input is valid', async () => {
    rental.dateCheckedOut = Date.now();
    await rental.save();
    await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = Date.now() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(5000);
  });

  it('should calculate the rental fee', async () => {
    rental.dateCheckedOut = moment().add(-7, 'days').toDate();
    await rental.save();
    await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it('should increment the movie by one upon successful return', async () => {
    await exec();
    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });

  it('should return a summary of the rental in the body of the response', async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    // Too specific b/c res returns a json object, which stores data
    // in strings:
    // expect(res.body).toMatchObject(rentalInDb);

    // This works, but is wordy:
    // expect(res.body).toHaveProperty('dateCheckedOut');
    // expect(res.body).toHaveProperty('dateReturned');
    // expect(res.body).toHaveProperty('rentalFee');
    // expect(res.body).toHaveProperty('movie.dailyRentalRate'); needed?
    // expect(res.body).toHaveProperty('customer');
    // expect(res.body).toHaveProperty('movie');
    
    // Better:
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(['dateCheckedOut', 'dateReturned', 
      'rentalFee', 'movie', 'customer']))
  });

 
});