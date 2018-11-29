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


// Expected: 1
// Received: [{ "_id": "5bfd5329b49407be0522fb9e", "dailyRentalRate": 2, "genre": { "_id": "5bfd5329b49407be0522fb9c", "name": "abcde" }, "numberInStock": 2, "title": "12345" }, {
//   "_id": "5bfd5329b49407be0522fba5", "dailyRe
// ntalRate": 2, "genre": {"_id": "5bfd5329b49407be0522fba3", "name": "abcde"}, "numberInStock": 2, "title": "12345"}, {"_id": "5bfd5329b49407be0522fbac", "dailyRentalRate": 2, "genre": {"_id": "5bfd5329b49407be0522fbaa",
// "name": "abcde"
// }, "numberInStock": 2, "title": "12345"}, { "_id": "5bfd5329b49407be0522fbb9", "dailyRentalRate": 2, "genre": { "_id": "5bfd5329b49407be0522fbb7", "name": "abcde" }, "numberInStock": 2, "title": "12345" }, { "_id": "5bfd5329b49407be0522fb9f", "dailyRentalRate": 2, "genre": { "_id": "5bfd5329b49407be0522fb9d", "name": "rstuv" }, "numberInStock": 2, "title": "56789" }, { "_id": "5bfd5329b49407be0522fba6", "dailyRentalRate": 2, "genre": { "_id": "5bfd5329b49407be0522fba4", "name": "rstuv" }, "numberInStock": 2, "title": "56789" }, { "_id": "5bfd5329b49407be0522fbad", "dailyRentalRate": 2, "genre": { "_id": "5bfd5329b49407be0522fbab", "name": "rstuv" }, "numberInStock": 2, "title": "56789" }, { "_id": "5bfd5329b49407be0522fbba", "dailyRentalRate": 2, "genre": { "_id": "5bfd5329b49407be0522fbb8", "name": "rstuv" }, "numberInStock": 2, "title": "56789" }]


// Expected: 1
// Received: {
//   "header": {
//     "connection": "close", "content-length": "1177", "content-type": "application/json; charset=utf-8", "date": "Tue, 27 Nov 2018 14:25:30 GMT", "etag": "W/\"499-qUxEBTwu2Pz7UPP8bHJVggfbAJk\"", "x-
//     powered - by": "Express"}, "req": {"data": undefined, "headers": {"user - agent": "node - superagent / 3.8.3", "x - auth - token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmZkNTNkYWVjMDQ0ZmJlYWUyZWIyOWMiLCJpYXQiOjE1NDMzMj
//     g3MzB9.5xlnI8t_Slbo0Rzn_m2lr2nytm - JFViX_QslyILYwIU"}, "method": "GET", "url": "http://127.0.0.1:52494/api/movies"}, "status": 200, "text": "[{\"_id\":\"5bfd53daec044fbeae2eb286\",\"title\":\"12345\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb284\",\"name\":\"abcde\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb28d\",\"title\":\"12345\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb28b\",\"name\":\"abcde\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb294\",\"title\":\"12345\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb292\",\"name\":\"abcde\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb2a1\",\"title\":\"12345\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb29f\",\"name\":\"abcde\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb287\",\"title\":\"56789\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb285\",\"name\":\"rstuv\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb28e\",\"title\":\"56789\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb28c\",\"name\":\"rstuv\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb295\",\"title\":\"56789\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb293\",\"name\":\"rstuv\"},\"numberInStock\":2,\"dailyRentalRate\":2},{\"_id\":\"5bfd53daec044fbeae2eb2a2\",\"title\":\"56789\",\"genre\":{\"_id\":\"5bfd53daec044fbeae2eb2a0\",\"name\":\"rstuv\"},\"numberInStock\":2,\"dailyRentalRate\":2}]"}
