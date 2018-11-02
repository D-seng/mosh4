const request = require('supertest');
const { Customer } = require('../../models/customer');
const { User } = require('../../models/user');


describe('api/customers', () => {
  let id;
  let server;
  let token;

  beforeEach(() => {
    server = require('../../app');
    token = new User().generateAuthToken();
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
  beforeEach(async () => {
    const customer = new Customer({ name: 'abcde', phone: '123456789' });
    await customer.save();
    id = customer._id;
  });

  it('should return 400 if customer is not found', async () => {
    id = '';
    const res = await request(server).get('/api/customers/' + id)
    expect(res.status).toBe(400);
  });
  
  it('should return 401 if user is not logged in', async () => {
    // const res = await request(server)
    //   .get('/api/customers/' + id)
    //   .set('x-auth-token', token)

    // expect(res.status).toBe(401);
  });






})
});

