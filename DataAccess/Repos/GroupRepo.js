const db = require('../../db');

class GroupRepo {
  static async getAllGroups() {
    try {
      const query = 'SELECT * FROM `groups`';
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  }
}

module.exports = GroupRepo;
