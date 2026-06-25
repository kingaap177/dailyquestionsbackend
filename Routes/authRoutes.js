const express = require('express');
const router = express.Router();
const authService = require('../Services/authService');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Gebruikersnaam en wachtwoord zijn verplicht' });
    }

    const user = await authService.login(username, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Uitgelogd' });
});

module.exports = router;
