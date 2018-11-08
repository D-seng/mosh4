const request = require('supertest');
const { Customer } = require('../../models/customer');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

describe('api/customers', () => {
  let id;
  let server;
  let token;
  let name;
  let isGold;
  let user;

  beforeEach(() => {
    server = require('../../app');
    user = new User({name: 'abcde', email: 'abcdefg', password: 'foobar', isAdmin: true})
    token = user.generateAuthToken();
    user.save();
  });
  afterEach(async () => {
    await server.close();
    await Customer.remove({});
    await User.remove({});
  });

  describe('GET /', () => {

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await request(server)
        .get('/api/customers')
        .set('x-auth-token', token);

      expect(res.status).toBe(401);
    });

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
  });

describe('GET /:id', () => {
  beforeEach(async () => {
    const customer = new Customer({ name: 'abcde', phone: '123456789' });
    await customer.save();
    id = customer._id;
  });

  const exec = () => {
    return request(server)
    .get('/api/customers/' + id)
    .set('x-auth-token', token)
  };

  it('should return 404 if customer is not found', async () => {
    // expect(token).toBe('1');
    const cust2 = new Customer( {name: 'abcdefg', phone: '123456789' })
    id = cust2._id;
    const res = await exec();

    expect(res.status).toBe(404);
  });
  
  it('should return 401 if user is not logged in', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 200 if customer is found', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should return customer if customer is found', async () => {
    const res = await exec();
    expect(res.body).toHaveProperty('name', 'abcde');
    expect(res.body).toHaveProperty('phone', '123456789');
  });
});

describe('POST /', () => {
beforeEach(() => {
  name = 'abcde';
  phone = '123456789';
  isGold = false;
})
  const exec = () => {
    return request(server)
      .post('/api/customers/')
      .set('x-auth-token', token)
      .send({name, phone, isGold})
  };

  it('should return 401 if user is not logged in', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  })

  it('should return 400 if name has fewer than 5 characters', async () => {
    name = 'abc';
    const res = await exec();
    // expect(name).toBe('a');

    expect(res.status).toBe(400);
  })

  it('should return customer if request is valid', async () => {
    const res = await exec();
    expect(res.body).toHaveProperty('name', name);
    expect(res.body).toHaveProperty('phone', phone);
    expect(res.body).toHaveProperty('_id');
  })

})

  describe('put /:id', () => {
    beforeEach(async () => {
      const customer = new Customer({ name: 'abcde', phone: '123456789' });
      await customer.save();
      id = customer._id;
    });

    const exec = () => {
      return request(server)
        .put('/api/customers/' + id)
        .set('x-auth-token', token)
        .send({ name: 'abcde', phone: '123456789'})
    };

    it('should return 401 if user is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 404 if customer is not found', async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return customer if request is valid', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('name', name);
      expect(res.body).toHaveProperty('phone', phone);
      expect(res.body).toHaveProperty('_id');
    })
});

describe('delete /:id', () => {
  beforeEach(async () => {
    const customer = new Customer({ name: 'abcde', phone: '123456789' });
    await customer.save();
    id = customer._id;
  });

  const exec = () => {
    return request(server)
    .delete('/api/customers/' + id)
    .set('x-auth-token', token)
    .send();
  }

  it('should return 401 if user is not logged in', async() => {
    
    
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  })

  it('should return 403 if user is not an admin', async () => {
    user = new User({ name: 'abcde', email: 'abcdefg', password: 'foobar', isAdmin: false })
    token = user.generateAuthToken();
    // expect(token).toBe(1);
    const res = await exec();
    expect(res.status).toBe(403);
  })

  it('should return 400 if customer not found', async () => {

    id = mongoose.Types.ObjectId();
    const res = await exec();
    expect(res.status).toBe(400);
  })

  it('should return customer if request is valid', async () => {
    const res = await exec();
    expect(res.body).toHaveProperty('name', 'abcde');
    expect(res.body).toHaveProperty('phone', '123456789');
  })

})
});