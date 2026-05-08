const Group = require('../../../Models/group');

describe('Group', () => {
    it('create a new group with the correct name', () => {
        const groupName = 'Test Group';
        const group = new Group(groupName);

        expect(group.name).toBe(groupName);
    });
});
