let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('../../app'); })
  afterEach(() => { server.close(); });
  describe('GET /', () => {
    it('should return all genres', () => {

    })
  })
})