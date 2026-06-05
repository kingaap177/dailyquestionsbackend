const UserRepo = require('../DataAccess/Repos/UserRepo');

class AuthService {
  static async login(username, password) {
    const user = await UserRepo.getUserByUsername(username);
    if (!user || user.password !== password) {
      throw new Error('Ongeldige gebruikersnaam of wachtwoord');
    }

    return {
      iduser: user.iduser,
      username: user.username,
    };
  }
}

module.exports = AuthService;
