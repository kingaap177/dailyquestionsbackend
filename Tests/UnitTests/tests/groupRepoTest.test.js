jest.resetModules();

jest.mock('../../../db');

const db = require('../../../db');
const GroupRepo = require('../../../DataAccess/Repos/GroupRepo');

describe('GroupRepo', () => {
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

  it('should return all groups', async () => {
    const fakeRows = [
      { id: 1, name: 'Study Group' },
      { id: 2, name: 'Project Team' },
    ];

    db.query.mockResolvedValue([fakeRows]);

    const result = await GroupRepo.getAllGroups();

    expect(result).toEqual(fakeRows);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM `groups`');
  });

  it('should throw error when db fails', async () => {
    db.query.mockRejectedValue(new Error('DB error'));

    await expect(GroupRepo.getAllGroups()).rejects.toThrow('DB error');
  });
});
