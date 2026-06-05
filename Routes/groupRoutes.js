const express = require('express');
const router = express.Router();
const groupService = require('../Services/groupService');

router.get('/group', async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/group/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/group', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Group name is required' });
    }

    const group = await groupService.addGroup(name);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;