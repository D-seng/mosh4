const admin = require('./middleware/admin');
const { User } = require('./models/user');
const mongoose = require('mongoose');

// describe('admin middleware', () => {
//   it('should reject a request with a 403 error if the user doesn\'t have admin status', () => {
//     const user = new User({_id: mongoose.Types.ObjectId().toHexString(),
//     isAdmin: false });

//   })
  
//   req = {
//     isAdmin
//   }
//   res = {};
//   next = jest.fn();
//   admin(req, res, next);

// })