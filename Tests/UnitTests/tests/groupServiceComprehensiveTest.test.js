jest.resetModules();
jest.mock('../../../DataAccess/Repos/GroupRepo');

const GroupRepo = require('../../../DataAccess/Repos/GroupRepo');
const GroupService = require('../../../Services/groupService');

describe('GroupService - Comprehensive', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroupById', () => {
    it('returns a group by ID', async () => {
      const mockGroup = { id: 1, name: 'Study Group' };
      GroupRepo.getGroupById.mockResolvedValue(mockGroup);

      const result = await GroupService.getGroupById(1);

      expect(result).toEqual(mockGroup);
      expect(GroupRepo.getGroupById).toHaveBeenCalledWith(1);
    });

    it('returns undefined when group not found', async () => {
      GroupRepo.getGroupById.mockResolvedValue(undefined);

      const result = await GroupService.getGroupById(999);

      expect(result).toBeUndefined();
    });

    it('throws error with custom message when database fails', async () => {
      GroupRepo.getGroupById.mockRejectedValue(new Error('DB error'));

      await expect(GroupService.getGroupById(1)).rejects.toThrow('Error fetching group: DB error');
    });
  });

  describe('addGroup', () => {
    it('adds a new group and returns it', async () => {
      const newGroup = { id: 10, name: 'New Study Group' };
      GroupRepo.addGroup.mockResolvedValue(newGroup);

      const result = await GroupService.addGroup('New Study Group');

      expect(result).toEqual(newGroup);
      expect(GroupRepo.addGroup).toHaveBeenCalledWith('New Study Group');
    });

    it('throws error with custom message when database fails', async () => {
      GroupRepo.addGroup.mockRejectedValue(new Error('Duplicate entry'));

      await expect(GroupService.addGroup('Existing Group')).rejects.toThrow(
        'Error adding group: Duplicate entry'
      );
    });

    it('handles empty group name', async () => {
      GroupRepo.addGroup.mockResolvedValue({ id: 11, name: '' });

      const result = await GroupService.addGroup('');

      expect(result).toEqual({ id: 11, name: '' });
      expect(GroupRepo.addGroup).toHaveBeenCalledWith('');
    });
  });

  describe('getAllGroups', () => {
    it('handles empty groups array', async () => {
      GroupRepo.getAllGroups.mockResolvedValue([]);

      const groups = await GroupService.getAllGroups();

      expect(groups).toHaveLength(0);
      expect(groups).toEqual([]);
    });

    it('throws error with custom message when database fails', async () => {
      GroupRepo.getAllGroups.mockRejectedValue(new Error('Connection timeout'));

      await expect(GroupService.getAllGroups()).rejects.toThrow(
        'Error fetching groups: Connection timeout'
      );
    });
  });
});
