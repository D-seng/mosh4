const lib = require ('../lib')

describe('absolute', () => {
  it('should return positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 number if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('darren');
    expect(result).toMatch(/darren/);
  })
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    const currencies = ['USD', 'AUD', 'EUR'];
    expect(result).toEqual(expect.arrayContaining(currencies));
  });
});

describe('getProduct', () => {
  it('should return the product id', () => {
    const result = lib.getProduct(1);
    //expect(result).toEqual( {id: 1, price: 10});
    expect(result).toMatchObject({id: 1, price: 10 });
    expect(result).toHaveProperty('id', 2);
  });
});

describe('registerUser', () => {
  it('should throw and exception with falsy input'), () => {
    args = [null, undefined, NaN, 0, '', false];
    args.
  }
})
