const request = require('supertest');
const app = require('../../server');

jest.mock('../../DataAccess/Repos/UserRepo', () => ({
  getUserByUsername: jest.fn(),
}));

const UserRepo = require('../../DataAccess/Repos/UserRepo');

describe('Auth integration tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns token-like response on valid login', async () => {
    UserRepo.getUserByUsername.mockResolvedValue({
      iduser: 1,
      username: 'testuser',
      password: 'password',
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200);

    expect(res.body).toHaveProperty('iduser', 1);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  test('returns 400 when missing credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ username: '' }).expect(400);

    expect(res.body).toHaveProperty('error');
  });
});
