const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const winston = require('winston');

describe('api/users', () => {
  let name;
  let email;
  let password;
  let server;
  let user;
  let token;

    beforeEach(() => {
      server = require('../../app');
    });

    afterEach(async () => {
      await server.close();
      await User.remove({});
    });

    describe('POST /', () => {

      beforeEach(async () => {
        name = '12345';
        email = 'example@mail.com';
        password = 'foobar';
        await User.remove({});
      });

      const exec = () => {
        return request(server)
          .post('/api/users')
          .send({ name: name, email: email, password: password })
      }

      it('should return 400 if username is fewer than 5 characters', async () => {
        name = '123';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return 400 if email is fewer than 5 characters', async () => {
        email = '123';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return 400 if password is fewer than 5 characters', async () => {
        password = '123';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return 400 if user already exists', async () => {
        const user = new User({ name: name, email: email, password: password });
        user.save();
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return user', async () => {
        const res = await exec();
        expect(res.body).toHaveProperty('name', name);
        expect(res.body).toHaveProperty('email', email);
      })
    });

    describe('GET /me', () => {
      
      beforeEach(() => {
        name = '12345';
        email = 'example2@mail.com';
        password = 'foobar';
        user = new User()
        token = user.generateAuthToken();
        user.name = name
        user.email = email
        user.password = password;
        user.save();
        // winston.info('USER test 1: ' + user._id);
        // winston.info('USER test 1b: ' + user.name);
        
        // winston.info('USERID: ' + user._id);
      });

      afterEach(() => {
        User.remove({});
      })

      const exec = () => {
        return request(server)
          .get('/api/users/me')
          .set('x-auth-token', token)
          .send();
      };

      it('should return 401 if no token is passed', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it('should return the user but not the password', async () => {
        // winston.info('USER test 2: ' + user._id);
        const res = await exec();
        expect(res.body).toHaveProperty('name', name);
        expect(res.body).toHaveProperty('email', email);
        expect(res.body).not.toHaveProperty('password');    
      });

      it('should return 404 if valid web token unconnected with a user is passed', async () => {
        token = new User().generateAuthToken();
        const res = await exec();
        expect(res.status).toBe(404);

      })
    });

    describe('GET /:id', () => {
      let userId;
      beforeEach(() => {
        name = 'rstuv';
        email = 'example@gmail.com';
        user = new User({name: name, email: email, password: 'foobar'})
        user.save()
        userId = user._id;
        token = user.generateAuthToken();
      })

      const exec = () => {
        return request(server)
          .get('/api/users/' + userId)
          .set('x-auth-token', token)
          .send();
      };

      it('should return 401 if no token is passed', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it('should return 404 if invalid ID is passed', async () => {
        userId = mongoose.Types.ObjectId();
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it('should return the user', async () => {
        const res = await exec();
        const properties = [['name', name], ['email', email]]
        properties.forEach(function([p, n]) {
          expect(res.body).toHaveProperty(p, n);
        });
        // expect(res).toBe(1);
      });
    });
  });