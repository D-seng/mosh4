const request = require('supertest');
const {Genre} = require('../../models/genre');
const { User} = require('../../models/user');
const mongoose = require('mongoose');
let server;

describe('/api/genres', () => {
  beforeEach(() => { 
      server = require('../../app'); 
   });
  afterEach(async () => { 
    server.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      
      Genre.collection.insertMany( [
        { name: 'genre1'},
        { name: 'genre2'}
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('should return genre with given id', async () => {
      const genre = new Genre({ name: 'genre1'});
      await genre.save();
      
      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });
    it('should return a 404 error if genre not found', async () => {
     
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
    });

    it('should return a 404 error if no genre with given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/genres/' + id);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /',  () => {
    let token;
    let name;
    beforeEach(() => { 
      token = new User().generateAuthToken();
      name = 'genre1'
      });

    const exec = () => {
      return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    } 

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });
    
    it('should return 400 if genre name has fewer than 5 characters', async () => {
      name = '1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if genre name has more than 50 characters', async () => {
      name = new Array(52).join('a');
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save valid genre', async () => {
      await exec();
      const result = await Genre.find({ name })
      expect(result).not.toBeNull();
    });

    it('should return genre if it\'s valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', name);
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let id;
    let name;

    //Paths:
    // 1. Not logged in (auth)
    // 2. Genre doesn't exist.
    // 3. Delete genre.
    // 4. Return genre
      
    beforeEach(() => {
      token = new User().generateAuthToken();
      id = mongoose.Types.ObjectId();
    });

    const exec = () => {
      return request(server)
        .delete('/api/genres' + id)
        .set('x-auth-token', token);
        // .send({ name: 'genre1' });
    } 

    it('should return 404 if the id is invalid', async () => {
      Genre.collection.insertOne({ name: 'genre2' });
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should delete the genre if a valid id is passed', async () => {
      id = genre._id;
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should return the genre after it is deleted', async () => {
      name = 'genre2';
      const genre = await Genre.collection.insertOne({ name });
      id = genre._id;
      const res = await exec();
      expect(id).toBe('a');
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', name);
    });
  });
});