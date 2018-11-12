const {User} = require('../../models/user');
const request = require('supertest');
const bcrypt = require('bcrypt');

describe('/api/logins POST /', () => {
  let email;
  let password;
  let isAdmin;
  let user;
  let name;
  let hashed;

  beforeEach(async() => { 
    server = require('../../app');
    email = 'right@rightemail.com';
    password = 'rightpassword';
    name = 'rightname';
    isAdmin = true;

    const salt = await bcrypt.genSalt(10);
    hashed = await bcrypt.hash(password, salt);
    
    user = new User({ name, email, password: hashed, isAdmin })
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

  it('should return 200 if valid email and password provided', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should return user if valid email and password provided', async () => {
    const res = await exec();
    expect(res.body).toHaveProperty('name', name);
    expect(res.body).toHaveProperty('password', hashed);
    expect(res.body).toHaveProperty('email', email);
    expect(res.body).toHaveProperty('_id');
  });

});
