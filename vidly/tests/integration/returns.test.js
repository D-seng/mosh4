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
    const rental = Rental.findOne();
    rental.dateReturned = Date.now();
    const res = await exec();
    expect(res.status).toBe(400);
  });

});