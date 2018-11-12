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
