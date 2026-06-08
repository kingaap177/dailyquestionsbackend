jest.resetModules();
jest.mock('../../../DataAccess/Repos/UserRepo');

const UserRepo = require('../../../DataAccess/Repos/UserRepo');
const AuthService = require('../../../Services/authService');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('returns user with valid credentials', async () => {
      const mockUser = {
        iduser: 1,
        username: 'testuser',
        password: 'password123',
      };

      UserRepo.getUserByUsername.mockResolvedValue(mockUser);

      const result = await AuthService.login('testuser', 'password123');

      expect(result).toEqual({
        iduser: 1,
        username: 'testuser',
      });
      expect(UserRepo.getUserByUsername).toHaveBeenCalledWith('testuser');
    });

    it('throws error when user not found', async () => {
      UserRepo.getUserByUsername.mockResolvedValue(null);

      await expect(
        AuthService.login('nonexistent', 'password')
      ).rejects.toThrow('Ongeldige gebruikersnaam of wachtwoord');
    });

    it('throws error when password is incorrect', async () => {
      const mockUser = {
        iduser: 1,
        username: 'testuser',
        password: 'correctpassword',
      };

      UserRepo.getUserByUsername.mockResolvedValue(mockUser);

      await expect(
        AuthService.login('testuser', 'wrongpassword')
      ).rejects.toThrow('Ongeldige gebruikersnaam of wachtwoord');
    });

    it('throws error when UserRepo fails', async () => {
      UserRepo.getUserByUsername.mockRejectedValue(new Error('Database error'));

      await expect(
        AuthService.login('testuser', 'password')
      ).rejects.toThrow('Database error');
    });
  });
});
