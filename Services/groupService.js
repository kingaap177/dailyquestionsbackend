const Group = require('../Models/group');

class GroupService {
    constructor() {
        this.groups = [
            new Group('Study Group'),
            new Group('Project Team'),
            new Group('Hobby Circle'),
        ];
    }

    async getAllGroups() {
        try {
            return this.groups;
        } catch (error) {
            throw new Error(`Error fetching groups: ${error.message}`);
        }
    }

    async addGroup(name) {
        try {
            const group = new Group(name);
            this.groups.push(group);
            return group;
        } catch (error) {
            throw new Error(`Error adding group: ${error.message}`);
        }
    }
}

module.exports = new GroupService();