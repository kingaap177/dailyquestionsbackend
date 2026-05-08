const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3001;

const groupRoutes = require('./Routes/groupRoutes');

app.use(cors()); // 👈 THIS FIXES YOUR ERROR
app.use(express.json());

app.use('/api', groupRoutes);

app.get('/', (req, res) => {
  res.send('Hello from your backend 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});