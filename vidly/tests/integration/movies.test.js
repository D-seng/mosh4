const request = require('supertest');
const { Movie } = require('../../models/movie');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const winston = require('winston');

const mongoose = require('mongoose');

describe('/api/genres', () => {
  let server;
  let token;
  let genre;
  let genreId;
  let title;

  beforeEach(async() => { 
      server = require('../../app');
      token = new User().generateAuthToken();
      genreId = mongoose.Types.ObjectId().toHexString();
    winston.info('AT CREATION ' + genreId)

      genre = new Genre({
        name: 'abcde',
        id: genreId
      })
      
      await genre.save();
      // genreId = genre._id;

      title = '12345'
   });

  afterEach(async () => { 
    await server.close();
    await Genre.remove({});
  });

  const exec = () => {
    return request(server)
    .post('/api/movies')
    .set('x-auth-token', token)
    .send({ title: title, 
      genreId: genreId,
      numberInStock: 2,
      dailyRentalRate: 2})
};

  describe('POST /', () => {

    it('should return 401 if no token is provided', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
      // expect(res).toBe(1);
    });

    it('should return 400 if an invalid token is provided', async () => {
      token = 1;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if movie title is less than 5 characters', async () => {
      title = '1234'
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 418 if genre ID is invalid', async () => {
      // genreId = 1;
      winston.info('FROM TEST ' + genreId)
      const res = await exec();
      expect(res.status).toBe(400);
    });
  })
});


  