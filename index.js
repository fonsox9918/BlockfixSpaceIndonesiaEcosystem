const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Blockfix Node.js Backend Server is running! (Updated)',
    timestamp: new Date().toISOString(),
    status: 'success',
    version: '1.0.0'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Test route for basic functionality
app.get('/test', (req, res) => {
  res.json({
    message: 'Basic test endpoint working',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// API routes placeholder
app.get('/api/products', (req, res) => {
  // Sample product data for testing
  const sampleProducts = [
    {
      id: 1,
      name: 'Modern Sofa Set',
      description: 'Comfortable 3-seater sofa perfect for living room',
      price: 2500000,
      originalPrice: 3000000,
      category: 'Furniture',
      images: ['https://via.placeholder.com/300x300?text=Modern+Sofa'],
      rating: 4.8,
      soldCount: 150,
      stock: 10,
      discountPercent: 17,
      discountTag: 'Flash Sale',
      shippingTime: '2-3 Hari',
      location: 'Jakarta'
    },
    {
      id: 2,
      name: 'Wooden Dining Table',
      description: 'Solid wood dining table for 6 people',
      price: 1800000,
      category: 'Furniture',
      images: ['https://via.placeholder.com/300x300?text=Dining+Table'],
      rating: 4.6,
      soldCount: 89,
      stock: 5,
      shippingTime: '3-5 Hari',
      location: 'Bandung'
    },
    {
      id: 3,
      name: 'LED Smart TV 55"',
      description: '4K Ultra HD Smart TV with Android OS',
      price: 4200000,
      originalPrice: 4800000,
      category: 'Electronics',
      images: ['https://via.placeholder.com/300x300?text=Smart+TV'],
      rating: 4.9,
      soldCount: 1200,
      stock: 15,
      discountPercent: 12,
      shippingTime: '1-2 Hari',
      location: 'Jakarta'
    },
    {
      id: 4,
      name: 'Office Chair Ergonomic',
      description: 'Comfortable ergonomic office chair with lumbar support',
      price: 850000,
      category: 'Furniture',
      images: ['https://via.placeholder.com/300x300?text=Office+Chair'],
      rating: 4.4,
      soldCount: 320,
      stock: 8,
      shippingTime: '2-4 Hari',
      location: 'Surabaya'
    }
  ];

  res.json({
    message: 'Products API endpoint',
    data: sampleProducts,
    status: 'success',
    total: sampleProducts.length
  });
});

app.get('/api/services', (req, res) => {
  res.json({
    message: 'Services API endpoint',
    data: [],
    status: 'success'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blockfix Backend Server running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🔥 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
