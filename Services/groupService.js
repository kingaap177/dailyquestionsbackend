const Group = require('../Models/group');
const GroupRepo = require('../DataAccess/Repos/GroupRepo');
const pool = require('../db');

class GroupService {
    constructor() {
        this.groups = [
            new Group('Study Group', 1),
            new Group('Project Team', 2),
            new Group('Hobby Circle', 3),
            new Group('test group', 4),

        ];
    }

    async getAllGroups() {
        try {
            const groups = await GroupRepo.getAllGroups();
            return groups;
        } catch (error) {
            throw new Error(`Error fetching groups: ${error.message}`);
        }
    }

    async addGroup(name) {
        try {
            const [result] = await pool.query('INSERT INTO groups (name) VALUES (?)', [name]);
            return { id: result.insertId, name };
        } catch (error) {
            throw new Error(`Error adding group: ${error.message}`);
        }
    }
}

module.exports = new GroupService();