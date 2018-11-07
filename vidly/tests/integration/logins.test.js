const {User} = require('../../models/user');
const request = require('supertest');

describe('/api/logins POST /', () => {
  let email;
  let password;
  let token;

  beforeEach(() => { 
    server = require('../../app');
    email = 'foobar@baz.com'
    password = 'foobar';
    token = User().generateAuthToken();
  });
  
  afterEach(async () => { 
    await server.close(); 
  });
  
  const exec = () => {
    return request(server)
      .post('/api/logins')
      .send({ email, password });
  }

  it('should return 400 if email is missing or invalid', async () => {
    email = 'aaa';
    const res = await exec();
    expect(res.status).toBe(400);
  }); 

  it('should return 400 if invalid password is provided', async () => {
    password = '';
    const res = await exec();
    expect(res.status).toBe(400);
  })
});
