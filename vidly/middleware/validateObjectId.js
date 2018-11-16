const mongoose = require('mongoose');

module.exports = function(req, res, next) {
  // console.log('run validateObject');
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res.status(404).send('Invalid ID.');
  
  next();
}