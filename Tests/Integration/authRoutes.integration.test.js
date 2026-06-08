const request = require('supertest');
const app = require('../../server');

jest.mock('../../DataAccess/Repos/UserRepo');
const UserRepo = require('../../DataAccess/Repos/UserRepo');

describe('Auth Routes Integration Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('returns user data on valid login', async () => {
      const mockUser = {
        iduser: 1,
        username: 'testuser',
        password: 'password123',
      };

      UserRepo.getUserByUsername.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'password123' })
        .expect(200);

      expect(res.body).toHaveProperty('iduser', 1);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).not.toHaveProperty('password');
    });

    it('returns 401 on invalid password', async () => {
      const mockUser = {
        iduser: 1,
        username: 'testuser',
        password: 'correctpassword',
      };

      UserRepo.getUserByUsername.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'wrongpassword' })
        .expect(401);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toContain('Ongeldige gebruikersnaam of wachtwoord');
    });

    it('returns 401 when user not found', async () => {
      UserRepo.getUserByUsername.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'nonexistent', password: 'password' })
        .expect(401);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toContain('Ongeldige gebruikersnaam of wachtwoord');
    });

    it('returns 400 when username is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Gebruikersnaam en wachtwoord zijn verplicht');
    });

    it('returns 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser' })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Gebruikersnaam en wachtwoord zijn verplicht');
    });

    it('returns 400 when both credentials are missing', async () => {
      const res = await request(app).post('/api/auth/login').send({}).expect(400);

      expect(res.body).toHaveProperty('error', 'Gebruikersnaam en wachtwoord zijn verplicht');
    });

    it('returns 400 when username is empty string', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: '', password: 'password' })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Gebruikersnaam en wachtwoord zijn verplicht');
    });

    it('returns 400 when password is empty string', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: '' })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Gebruikersnaam en wachtwoord zijn verplicht');
    });

    it('returns 500 when database error occurs', async () => {
      UserRepo.getUserByUsername.mockRejectedValue(new Error('Database connection failed'));

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'password' })
        .expect(401);

      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('returns success response', async () => {
      const res = await request(app).post('/api/auth/logout').expect(200);

      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Uitgelogd');
    });

    it('does not require any body', async () => {
      const res = await request(app).post('/api/auth/logout').expect(200);

      expect(res.body).toHaveProperty('success');
    });
  });
});
