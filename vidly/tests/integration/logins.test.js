const {User} = require('../../models/user');
const request = require('supertest');

describe('/api/logins POST /', () => {
  let email;
  let password;
  let isAdmin;
  let user2;
  let name;

  beforeEach(async() => { 
    server = require('../../app');
    email = 'right@rightemail.com';
    password = 'rightpassword';
    name = 'rightname';
    isAdmin = true;
    // User.collection.insertOne(
    //   { name: name, email: email, password: password }
    // );

    user = new User({ name, email, password, isAdmin })
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
    email = 'wrong@wrongemail.com';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 401 if valid but incorrect password is provided', async () => {
    password = 'wrongpassword';
    const res = await exec();
    expect(res.status).toBe(401);
  });

});
