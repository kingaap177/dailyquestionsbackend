const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const authRoutes = require('./Routes/authRoutes');
const groupRoutes = require('./Routes/groupRoutes');

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', groupRoutes);

app.get('/', (req, res) => {
  res.send('Hello from your backend 🚀');
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.info(`Server running on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
