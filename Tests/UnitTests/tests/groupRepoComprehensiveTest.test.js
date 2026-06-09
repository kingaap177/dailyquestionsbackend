jest.resetModules();
jest.mock('../../../db');

const db = require('../../../db');
const GroupRepo = require('../../../DataAccess/Repos/GroupRepo');

describe('GroupRepo - Comprehensive', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroupById', () => {
    it('returns a group by ID', async () => {
      const mockGroup = { id: 1, name: 'Study Group' };
      db.query.mockResolvedValue([[mockGroup]]);

      const result = await GroupRepo.getGroupById(1);

      expect(result).toEqual(mockGroup);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM `groepen` WHERE id = ? LIMIT 1', [1]);
    });

    it('returns undefined when group not found', async () => {
      db.query.mockResolvedValue([[]]);

      const result = await GroupRepo.getGroupById(999);

      expect(result).toBeUndefined();
    });

    it('throws error when database fails', async () => {
      db.query.mockRejectedValue(new Error('DB error'));

      await expect(GroupRepo.getGroupById(1)).rejects.toThrow('DB error');
    });
  });

  describe('addGroup', () => {
    it('adds a new group and returns it with generated ID', async () => {
      db.query.mockResolvedValue([{ insertId: 5 }]);

      const result = await GroupRepo.addGroup('New Group');

      expect(result).toEqual({ id: 5, name: 'New Group' });
      expect(db.query).toHaveBeenCalledWith('INSERT INTO `groepen` (name) VALUES (?)', [
        'New Group',
      ]);
    });

    it('throws error when database fails', async () => {
      db.query.mockRejectedValue(new Error('DB error'));

      await expect(GroupRepo.addGroup('New Group')).rejects.toThrow('DB error');
    });

    it('handles special characters in group name', async () => {
      const specialName = "Group's & Others";
      db.query.mockResolvedValue([{ insertId: 6 }]);

      const result = await GroupRepo.addGroup(specialName);

      expect(result).toEqual({ id: 6, name: specialName });
    });
  });

  describe('updateGroup', () => {
    it('updates a group and returns it', async () => {
      db.query.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await GroupRepo.updateGroup(1, 'Updated Group');

      expect(result).toEqual({ id: 1, name: 'Updated Group' });
      expect(db.query).toHaveBeenCalledWith('UPDATE `groepen` SET name = ? WHERE id = ?', [
        'Updated Group',
        1,
      ]);
    });

    it('throws error when database fails', async () => {
      db.query.mockRejectedValue(new Error('DB error'));

      await expect(GroupRepo.updateGroup(1, 'Updated Group')).rejects.toThrow('DB error');
    });
  });

  describe('deleteGroup', () => {
    it('deletes a group and returns it', async () => {
      db.query.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await GroupRepo.deleteGroup(1);

      expect(result).toEqual({ id: 1 });
      expect(db.query).toHaveBeenCalledWith('DELETE FROM `groepen` WHERE id = ?', [1]);
    });

    it('throws error when database fails', async () => {
      db.query.mockRejectedValue(new Error('DB error'));

      await expect(GroupRepo.deleteGroup(1)).rejects.toThrow('DB error');
    });
  });

  describe('getAllGroups - additional tests', () => {
    it('handles multiple groups', async () => {
      const fakeRows = [
        { id: 1, name: 'Study Group' },
        { id: 2, name: 'Project Team' },
        { id: 3, name: 'Hobby Circle' },
      ];
      db.query.mockResolvedValue([fakeRows]);

      const result = await GroupRepo.getAllGroups();

      expect(result).toHaveLength(3);
      expect(result).toEqual(fakeRows);
    });

    it('handles empty groups table', async () => {
      db.query.mockResolvedValue([[]]);

      const result = await GroupRepo.getAllGroups();

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });
});
