jest.resetModules();
jest.mock('../../../DataAccess/Repos/GroupRepo');

const GroupRepo = require('../../../DataAccess/Repos/GroupRepo');
const GroupService = require('../../../Services/groupService');

describe('GroupService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGroups', () => {
    it('returns all groups', async () => {
      const mockGroups = [
        { id: 1, name: 'Study Group' },
        { id: 2, name: 'Project Team' },
        { id: 3, name: 'Hobby Circle' },
      ];

      GroupRepo.getAllGroups.mockResolvedValue(mockGroups);

      const groups = await GroupService.getAllGroups();

      expect(groups).toHaveLength(3);
      expect(groups.map(g => g.name)).toEqual(['Study Group', 'Project Team', 'Hobby Circle']);

      expect(GroupRepo.getAllGroups).toHaveBeenCalledTimes(1);
    });
  });

  // describe('addGroup', () => {

  //     it('adds a new group and returns it', async () => {

  //         const newGroup = {
  //             id: 10,
  //             name: 'New Study Group'
  //         };

  //         GroupRepo.addGroup.mockResolvedValue(newGroup);

  //         const result = await GroupService.addGroup('New Study Group');

  //         expect(result).toEqual(newGroup);

  //         expect(GroupRepo.addGroup).toHaveBeenCalledWith('New Study Group');
  //     });

  // });
});
