const GroupRepo = require('../DataAccess/Repos/GroupRepo');

class GroupService {
  async getAllGroups() {
    try {
      return await GroupRepo.getAllGroups();
    } catch (error) {
      throw new Error(`Error fetching groups: ${error.message}`);
    }
  }

  async getGroupById(id) {
    try {
      return await GroupRepo.getGroupById(id);
    } catch (error) {
      throw new Error(`Error fetching group: ${error.message}`);
    }
  }

  async addGroup(name) {
    try {
      return await GroupRepo.addGroup(name);
    } catch (error) {
      throw new Error(`Error adding group: ${error.message}`);
    }
  }
}

module.exports = new GroupService();
