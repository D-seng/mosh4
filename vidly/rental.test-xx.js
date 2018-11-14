/**
 * @jest-environment node
 */
const { Movie } = require('./models/movie');
const { Customer } = require('./models/customer');
const { Genre } = require('./models/genre');
const { Rental, validate } = require('./models/rental');
const mongoose = require('mongoose');

let customer1;
let movie;
let genre;

describe('validateRental', () => {

  beforeEach(async() => {
    server = require('./app');
    customer = new Customer( { name: 'aaaaa', phone: '123456789'});
    
    //make movie and customer schemas insead of instances.
    // movie = new Movie( {title: 'aaaaa', 
    //   genre: { _id: genre._id, name: genre.name},
    // numberInStock: 1,
    // dailyRentalRate: 1})

    });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    // await Movie.remove({});
  });

  it('should return joi-generated error if invalid customerId is passed', () => {
    
    // await rental.save();

    // const validated = validate(rental);
    // expect(rental).toBe(1);
    // expect(validated).toBe(1);
    // expect(validated.error.toString()).toBe(1);
    // expect(validated.error.toString()).toMatch(/child/);
  });
});