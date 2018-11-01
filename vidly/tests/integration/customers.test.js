const request = require('supertest');
const { Customer } = require('../../models/customer');
const { User } = require('../../models/user');

let server;
let token;

describe('api/customers', () => {
  beforeEach(() => {
    server = require('../../app');
    token = new User().generateAuthToken()
  });
  afterEach(async () => {
    await server.close();
    await Customer.remove({});
  });

  describe('GET /', () => {
    it('should return all users', async () => {
      Customer.collection.insertMany( [
        { name: 'abcdefg', phone: '123456789' },
        { name: 'abcde', phone: '123456789' }
      ]);
      const res = await request(server)
        .get('/api/customers')
        .set('x-auth-token', token);
      expect(res.status).toBe(200);
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await request(server)
        .get('/api/customers')
        .set('x-auth-token', token);

      expect(res.status).toBe(401);
    });
  });
describe('GET /:id', () => {
    const customer = new Customer( {name: 'abcde', phone: '123456789'})

})
});

