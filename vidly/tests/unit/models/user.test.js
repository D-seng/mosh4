const { User } = require('../../../models/user');
const jwt = rquire('jsonwebtoken')

describe('user.generateAuthToken', () => {
    it('should return a JSON web token', () => {
        const user = new User ({id: 1, isAdmin: true });
        const result = user.generateAuthToken();
        expect(result).toBeGreaterThanOrEqual(0);
    })
})