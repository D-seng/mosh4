/**
 * @jest-environment node
 */

const { User, validate } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
    it('should return a JSON web token', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
});

describe('validateUser', () => {
    // let user;
    beforeEach(() => {
       
    });
    
    it('should return false if invalid name is passed', () => {
        
        // expect(user).toBe(1);
        const user = new User({ name: 'aaa', email: 'valid@validemail.com', password: 'aaaaa', isAdmin: false }); 
        const validated = validate(user);
        // expect(error).toBe(1);
        // expect(error).toBeTruthy();
        expect(validated.error.toString()).toMatch(/child/);
        //expect(validated).toBe('[ValidationError: child "name" fails because ["name" length must be at least 5 characters long]]');
        // expect(validate(user)).toHaveProperty('error', '[ValidationError: child "name" fails because ["name" length must be at least 5 characters long]]');
    })
});