const request = require('supertest');
const app = require('../../../server');

describe('Server', () => {
  describe('GET /', () => {
    it('returns a welcome message', async () => {
      const res = await request(app).get('/').expect(200);

      expect(res.text).toContain('Hello from your backend');
    });
  });

  describe('Server exports', () => {
    it('exports Express app', () => {
      expect(app).toBeDefined();
      expect(typeof app).toBe('function');
    });
  });
});
