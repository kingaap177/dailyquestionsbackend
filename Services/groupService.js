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

  async updateGroup(id, name) {
    try {
      return await GroupRepo.updateGroup(id, name);
    } catch (error) {
      throw new Error(`Error updating group: ${error.message}`);
    }
  }

  async deleteGroup(id) {
    try {
      return await GroupRepo.deleteGroup(id);
    } catch (error) {
      throw new Error(`Error deleting group: ${error.message}`);
    }
  }
}

module.exports = new GroupService();
