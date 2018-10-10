const lib = require ('../lib');
const db = require('../db');
const mail = require('../mail');

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
    const currencies = ['USD', 'AUD', 'EUR']
    expect(result).toEqual(expect.arrayContaining(currencies));
  });
});

describe('getProduct', () => {
  it('should reutrn a product with a given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
  });
});

// need two tests
describe('registerUser', () => {
  it('should throw if falsey value passed', () => {
    args = [false, 0, null, undefined, NaN, ''];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a).toThrow('Username is required');
      }
    );
  });
});
  it('should return object containing current datetime as id and username as username', () => {
  result =  lib.registerUser('a');
  expect(result).toMatchObject( { username: 'a' } );
  expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply a 10% discount if the customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId) {
      console.log('Getting fake customer...')
      return ({ customerId: customerId, points: 20 });
    }
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to a customer', () => {
    db.getCustomerSync = function (customerId) {
      console.log('Getting fake customer...')
      return ({ email: 'a' });
    }

    let mailSent = false;
    mail.send = function(email, message) {
      mailSent = true;
    }

    const order = { customerId: 1,}

    lib.notifyCustomer(order);
    expect(mailSent).toBe(true);
  });
});
