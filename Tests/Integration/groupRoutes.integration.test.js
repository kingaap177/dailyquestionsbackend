const request = require('supertest');
const app = require('../../server');

jest.mock('../../DataAccess/Repos/GroupRepo');
const GroupRepo = require('../../DataAccess/Repos/GroupRepo');

describe('Group Routes Integration Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/group', () => {
    it('returns all groups', async () => {
      const mockGroups = [
        { id: 1, name: 'Study Group' },
        { id: 2, name: 'Project Team' },
      ];

      GroupRepo.getAllGroups.mockResolvedValue(mockGroups);

      const res = await request(app).get('/api/group').expect(200);

      expect(res.body).toEqual(mockGroups);
      expect(GroupRepo.getAllGroups).toHaveBeenCalled();
    });

    it('returns empty array when no groups exist', async () => {
      GroupRepo.getAllGroups.mockResolvedValue([]);

      const res = await request(app).get('/api/group').expect(200);

      expect(res.body).toEqual([]);
    });

    it('returns 500 when database error occurs', async () => {
      GroupRepo.getAllGroups.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/group').expect(500);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toContain('Database error');
    });
  });

  describe('GET /api/group/:id', () => {
    it('returns a group by ID', async () => {
      const mockGroup = { id: 1, name: 'Study Group' };
      GroupRepo.getGroupById.mockResolvedValue(mockGroup);

      const res = await request(app).get('/api/group/1').expect(200);

      expect(res.body).toEqual(mockGroup);
      expect(GroupRepo.getGroupById).toHaveBeenCalledWith('1');
    });

    it('returns 404 when group not found', async () => {
      GroupRepo.getGroupById.mockResolvedValue(null);

      const res = await request(app).get('/api/group/999').expect(404);

      expect(res.body).toHaveProperty('error', 'Group not found');
    });

    it('returns 500 when database error occurs', async () => {
      GroupRepo.getGroupById.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/group/1').expect(500);

      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/group', () => {
    it('creates a new group', async () => {
      const newGroup = { id: 3, name: 'New Group' };
      GroupRepo.addGroup.mockResolvedValue(newGroup);

      const res = await request(app).post('/api/group').send({ name: 'New Group' }).expect(201);

      expect(res.body).toEqual(newGroup);
      expect(GroupRepo.addGroup).toHaveBeenCalledWith('New Group');
    });

    it('returns 400 when group name is missing', async () => {
      const res = await request(app).post('/api/group').send({}).expect(400);

      expect(res.body).toHaveProperty('error', 'Group name is required');
      expect(GroupRepo.addGroup).not.toHaveBeenCalled();
    });

    it('returns 400 when group name is empty string', async () => {
      const res = await request(app).post('/api/group').send({ name: '' }).expect(400);

      expect(res.body).toHaveProperty('error', 'Group name is required');
    });

    it('returns 500 when database error occurs', async () => {
      GroupRepo.addGroup.mockRejectedValue(new Error('Duplicate entry'));

      const res = await request(app)
        .post('/api/group')
        .send({ name: 'Existing Group' })
        .expect(500);

      expect(res.body).toHaveProperty('error');
    });

    it('accepts group name with special characters', async () => {
      const specialName = "Group's & Others";
      const newGroup = { id: 4, name: specialName };
      GroupRepo.addGroup.mockResolvedValue(newGroup);

      const res = await request(app).post('/api/group').send({ name: specialName }).expect(201);

      expect(res.body).toEqual(newGroup);
      expect(GroupRepo.addGroup).toHaveBeenCalledWith(specialName);
    });
  });
});
