const request = require('supertest');
const {User} = require('../../models/user');

let server;
let token;

describe('api/customers', () => {
  beforeEach(() => {
    server = require('../../app');
  });
  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  describe('GET /', () => {
    it('should return 401 if user is not logged in', async () => {
      //token = new User().generateAuthToken();
      token = '';

      const res = await request(server)
      .get('api/customers')
      .set('x-auth-token', token);

      expect(res.status).toBe(401);
    });
  });
});


// const exec = () => {

// }); 
