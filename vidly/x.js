// Received: { "header": { "connection": "close", "content-length": "16", "content-type": "text/html; charset=utf-8", "date": "Fri, 16 Nov 2018 13:33:17 GMT", "etag": "W/\"10-tQxSR5G+SLlKraKYSPEkH884hww\"", "x-powered-by": "Express" }, "req": { "data": undefined, "headers": { "user-agent": "node-superagent/3.8.3", "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVlYzcxZDFiOGMxMTgyNzVlOTJlMDciLCJpYXQiOjE1NDIzNzUxOTd9.xwbo7veRjx4LL07ybBvUEJAeI_e7nQWWHF338V209t0" }, "method": "DELETE", "url": "http://127.0.0.1:54501/api/rentals/5beec71d1b8c118275e92e0f" }, "status": 400, "text": "Rental not found" }

// POST /api/returns {customerId, movieId}
// It should return 401 if user is not logged in.
// It should return 400 if the customerId is not found.
// It should return 400 if the movieId is not found.
// It should return 404 if not rental found for this customer and movie.
// It should return 400 if movie is already returned.
// It should return 200 if the request is valid.
// It should increment the movie by one upon successful return.
// It should set the date returned on the rental.
// It should set the fee on the rental.
// It should return the summary of the rental.

// AKIAI633AUPBS6VFU6HQ


// Expected the object:
// { "catch": [Function catch], "error": [ValidationError: child "name" fails because["name" length must be at least 5 characters long]], "then": [Function then], "value": { "_id": "5be7bc988867a99b54cc6d19", "email": "valid@validemail.com", "isAdmin": false, "name": "aaa", "password": "aaaaa" } }
// To have a nested property:
// "error"
// With a value of:
// "[ValidationError: child \"name\" fails because [\"name\" length must be at least 5 characters long]]"
// Received:
// [ValidationError: child "name" fails because["name" length must be at least 5 characters long]]

//passed
// [ValidationError: "$__" is not allowed. "isNew" is not allowed. "errors" is not allowed. "_doc" is not allowed]

//failed
//[ValidationError: child "name" fails because ["name" length must be at least 5 characters long]]
//{"catch": [Function catch], "error": [ValidationError: child "name" fails because ["name" length must be at least 5 characters long]], "then": [Function then], "value": {"_id": "5be84f3cd18117a44e00be3b", "email": "valid@validemail.com", "isAdmin": false, "name": "aaa", "password": "aaaaa"}}

//passed
//{"catch": [Function catch], "error": [ValidationError: "$__" is not allowed. "isNew" is not allowed. "errors" is not allowed. "_doc" is not allowed], "then": [Function then], "value": {"_id": "5be84f6443d66ca482321095", "email": "valid@validemail.com", "isAdmin": false, "name": "aaaaa", "password": "aaaaa"}}

  // const customerSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //     minlength: 5,
  //     maxlength: 50
  //   },
  //   isGold: {
  //     type: Boolean,
  //     default: false
  //   },
  //   phone: {
  //     type: String,
  //     required: true
  //   }
  // });

  // const movieSchema = new mongoose.Schema({
  //   title: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //     minlength: 5,
  //     maxlength: 255
  //   },
  //   dailyRentalRate: {
  //     type: Number,
  //     required: true,
  //     min: 0,
  //     max: 50
  //   }
  // });

  // const rentalSchema = new mongoose.Schema({
  //   customer: customerSchema,
  //   movie: movieSchema,
  //   dateCheckedOut: {
  //     type: Date,
  //     required: true,
  //     default: Date.now()
  //   },
  //   dateReturned: Date,
  //   rentalFee: {
  //     type: Number,
  //     min: 0,
  //     max: 50
  //   }
  // });