jest.resetModules();
jest.mock('../../../db');

const db = require('../../../db');
const UserRepo = require('../../../DataAccess/Repos/UserRepo');

describe('UserRepo', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserByUsername', () => {
    it('returns user when found', async () => {
      const mockUser = {
        iduser: 1,
        username: 'testuser',
        password: 'hashedpassword',
      };

      db.query.mockResolvedValue([[mockUser]]);

      const result = await UserRepo.getUserByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(db.query).toHaveBeenCalledWith(
        'SELECT iduser, username, password FROM `user` WHERE username = ? LIMIT 1',
        ['testuser']
      );
    });

    it('returns undefined when user not found', async () => {
      db.query.mockResolvedValue([[]]);

      const result = await UserRepo.getUserByUsername('nonexistent');

      expect(result).toBeUndefined();
      expect(db.query).toHaveBeenCalledWith(
        'SELECT iduser, username, password FROM `user` WHERE username = ? LIMIT 1',
        ['nonexistent']
      );
    });

    it('throws error when database fails', async () => {
      db.query.mockRejectedValue(new Error('DB connection failed'));

      await expect(UserRepo.getUserByUsername('testuser')).rejects.toThrow('DB connection failed');
    });

    it('handles SQL injection safely with parameterized queries', async () => {
      const maliciousInput = "'; DROP TABLE user; --";
      db.query.mockResolvedValue([[]]);

      await UserRepo.getUserByUsername(maliciousInput);

      expect(db.query).toHaveBeenCalledWith(
        'SELECT iduser, username, password FROM `user` WHERE username = ? LIMIT 1',
        [maliciousInput]
      );
    });
  });
});
