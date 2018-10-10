const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
  it('should throw if it receives a non-numerical input', () => {
    args = [null, undefined, NaN, 'a', false, true];
    args.forEach(arg => {
      expect(() => {
        exercise1.fizzBuzz(arg).toThrow();
      });
  });
});
  it('should return FizzBuzz if you pass a number divisible by 3 and 5', () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('should return Fizz if you pass a number divisible only by 3', () => {
    const result = exercise1.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  it('should return Buzz if you pass a number divisible by 5', () => {
    const result = exercise1.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  it('should return the input if the input is not divisible by 5 or 3', () => {
    const result = exercise1.fizzBuzz(4);
    expect(result).toBe(4);
  });
});

