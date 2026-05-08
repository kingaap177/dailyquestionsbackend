const GroupService = require('../../../Services/groupService');
const Group = require('../../../Models/group');

describe('GroupService', () => {
    const initialGroups = ['Study Group', 'Project Team', 'Hobby Circle'];

    beforeEach(() => {
        GroupService.groups = initialGroups.map(name => new Group(name));
    });

    describe('getAllGroups', () => {
        it('returns all groups', async () => {
            const groups = await GroupService.getAllGroups();

            expect(groups).toHaveLength(3);
            expect(groups.map(group => group.name)).toEqual(initialGroups);
        });
    });

    describe('addGroup', () => {
        it('adds a new group and returns it', async () => {
            const newGroupName = 'New Study Group';
            const group = await GroupService.addGroup(newGroupName);

            expect(group).toBeInstanceOf(Group);
            expect(group.name).toBe(newGroupName);
            expect(GroupService.groups).toContain(group);
            expect(GroupService.groups).toHaveLength(4);
        });
    });
});