

module.exports = function (req, res, next) {
  // This function will be executed after the auth middleware function,
  // so we'll have req.user available. 
  if(!req.user.isAdmin) return res.status(403).send('No admin privileges.');
  next();
}