const {User} = require('../../models/user');
const request = require('supertest');

describe('/api/logins POST /', () => {
  let email;
  let password;
  let user;
  let name;

  beforeEach(async() => { 
    server = require('../../app');
    email = 'foobar@baz.com';
    password = 'foobar';
    name = 'abcdefg';
    user = new User({ name: name, email: email, password: password, isAdmin: false })
    await user.save(); 
  });
  
  afterEach(async () => { 
    await server.close(); 
    await User.remove({});
  });
  
  const exec = () => {
    return request(server)
      .post('/api/logins/')
      .send({ email: email, password: password });
  }

  it('should return 400 if email is missing or invalid', async () => {
    email = 'aaaaaa';
    const res = await exec();
    expect(res.status).toBe(400);
  }); 

  it('should return 400 if invalid password is provided', async () => {
    password = 'aaa';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 401 if valid but incorrect email is provided', async () => {
    const res = await exec();
    expect(res).toBe(1);
    expect(res.status).toBe(401);
  });

});
