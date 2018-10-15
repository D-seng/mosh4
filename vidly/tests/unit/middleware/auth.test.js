const auth = require('../../../middleware/auth');
const { User } = require('../../../models/user');

const mongoose = require('mongoose');

describe('auth middlware', () => {
  it('should populate req.user with a payload with a payload that includes valid token', () => {
    const user = { 
      _id: mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true };
    const token = new User(user).generateAuthToken();
    req = {
      header: jest.fn().mockReturnValue(token)
    };
    res = {};
    next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(user);

  });
});