require('dotenv').config();
const express = require('express');
const cors = require('cors');

const uploadRoutes = require('./src/routes/uploadRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Register routes
app.use('/api', categoryRoutes);
app.use('/api', uploadRoutes);
app.use('/api', productRoutes);
app.use('/api', serviceRoutes);

// Tes route utama
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
