const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3001;

const authRoutes = require('./Routes/authRoutes');
const groupRoutes = require('./Routes/groupRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', groupRoutes);

app.get('/', (req, res) => {
  res.send('Hello from your backend 🚀');
});

app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
