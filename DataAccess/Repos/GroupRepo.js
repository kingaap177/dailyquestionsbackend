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

  static async getGroupById(groupId) {
    try {
      const query = 'SELECT * FROM `groups` WHERE id = ?';
      const [rows] = await db.query(query, [groupId]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching group with ID ${groupId}:`, error);
      throw error;
    }
  }

  static async addGroup(groupName) {
    try {
      const query = 'INSERT INTO `groups` (name) VALUES (?)';
      const [result] = await db.query(query, [groupName]);
      return { id: result.insertId, name: groupName };
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }

  static async updateGroup(groupId, groupName) {
    try {
      const query = 'UPDATE `groups` SET name = ? WHERE id = ?';
      const [result] = await db.query(query, [groupName, groupId]);
      return { id: groupId, name: groupName };
    } catch (error) {
      console.error(`Error updating group with ID ${groupId}:`, error);
      throw error;
    }
  }

  static async deleteGroup(groupId) {
    try {
      const query = 'DELETE FROM `groups` WHERE id = ?';
      const [result] = await db.query(query, [groupId]);
      return { id: groupId };
    } catch (error) {
      console.error(`Error deleting group with ID ${groupId}:`, error);
      throw error;
    }
  }
}

module.exports = GroupRepo;
