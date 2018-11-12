/**
 * @jest-environment node
 */
const { Movie } = require('../../../models/movie');
const { Customer } = require('../../../models/customer');
const { Genre } = require('../../../models/genre');
const { Rental, validate } = require('../../../models/rental');
const mongoose = require('mongoose');

let customer1;
let movie;
let genre;

describe('validateRental', () => {

  beforeEach(async() => {
    server = require('../../../app');
    genre = new Genre( { name: 'ggggg'})
    customer1 = new Customer( { name: 'aaaaa', phone: '123456789'});
    
    movie = new Movie( {title: 'aaaaa', 
      genre: { _id: genre._id, name: genre.name},
    numberInStock: 1,
    dailyRentalRate: 1})

    });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    // await Movie.remove({});
  });

  it('should return joi-generated error if invalid customerId is passed', async () => {
    const rental = new Rental({
      customer: {
        _id: customer1._id,
        name: '12345',
        phone: '12345'
      },
      movie: {
        _id: movie._id,
        title: '12345',
        numberInStock: 6,
        dailyRentalRate: 2
      }
    });
    await rental.save();

    const validated = validate(rental);
    // expect(rental).toBe(1);
    // expect(validated).toBe(1);
    expect(validated.error.toString()).toBe(1);
    expect(validated.error.toString()).toMatch(/child/);
  });

});