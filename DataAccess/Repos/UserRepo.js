const db = require('../../db');

class UserRepo {
  static async getUserByUsername(username) {
    try {
      const query = 'SELECT iduser, username, password FROM `user` WHERE username = ? LIMIT 1';
      const [rows] = await db.query(query, [username]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching user by username ${username}:`, error);
      throw error;
    }
  }
}

module.exports = UserRepo;
