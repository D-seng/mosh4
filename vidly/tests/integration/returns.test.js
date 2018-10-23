const request = require('supertest');
const { Rental } = require('../../models/rental');

const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const mongoose = require('mongoose');

describe('api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  let payload;

  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require('../../app');
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

     rental = new Rental({ 
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345' },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2
      }
    });
      await rental.save();
  });
  afterEach(async () => {
    server.close();
    await Rental.remove({});
  });
  
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
    await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = Date.now() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(5000);
  });

  it('should calculate the rental fee', async () => {
    rental.dateCheckedOut = new Date(2018, 1, 1);

    await exec();
    const rentalInDb = await Rental.findById(rental._id);
    // expect(rentalInDb.movie.dailyRentalRate).toBe(15);
    expect(rentalInDb.rentalFee).toBeGreaterThanOrEqual(1000000); 
    // expect(rentalInDb.rentalFee).toBeGreaterThanOrEqual(rentalInDb.movie.dailyRentalRate);
  });

});