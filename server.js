const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3001;

const authRoutes = require('./Routes/authRoutes');
const groupRoutes = require('./Routes/groupRoutes');

const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-domain.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', groupRoutes);

app.get('/', (req, res) => {
  res.send('Hello from your backend 🚀');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
