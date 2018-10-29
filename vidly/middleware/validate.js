
module.exports = (validator) => {

  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  } 
}


// if (!req.body.customerId) return res.status(400).send('No customer id provided.');
// if (!req.body.movieId) return res.status(400).send('No customer id provided.');