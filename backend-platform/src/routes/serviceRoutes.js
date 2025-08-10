const express = require('express');
const { db, admin } = require('../config/firebaseConfig');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validasi URL gambar
const isValidImageUrl = (url) => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  return url.startsWith('http') && validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Unit yang valid untuk layanan
const VALID_UNITS = ["per m²", "per titik", "per item"];

// Validasi data layanan
const validateService = (data, isUpdate = false) => {
  const errors = {
    invalidFields: [],
    messages: []
  };

  // Validasi field yang wajib ada (kecuali untuk update partial)
  if (!isUpdate) {
    const requiredFields = {
      'name': 'nama',
      'price': 'harga',
      'unit': 'unit',
      'images': 'gambar'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!data[field]) {
        errors.invalidFields.push(field);
        errors.messages.push(`${label} wajib diisi`);
      }
    }
  }

  // Validasi nama
  if (data.name) {
    if (data.name.length < 3 || data.name.length > 100) {
      errors.invalidFields.push('name');
      errors.messages.push('Nama layanan harus antara 3 sampai 100 karakter');
    }
  }

  // Validasi harga
  if (data.price) {
    const priceValue = parseFloat(data.price);
    if (isNaN(priceValue) || priceValue < 1000) {
      errors.invalidFields.push('price');
      errors.messages.push('Harga minimal Rp 1.000');
    }
  }

  // Validasi unit
  if (data.unit && !VALID_UNITS.includes(data.unit)) {
    errors.invalidFields.push('unit');
    errors.messages.push(`Unit harus salah satu dari: ${VALID_UNITS.join(', ')}`);
  }

  // Validasi gambar
  if (data.images) {
    if (!Array.isArray(data.images)) {
      errors.invalidFields.push('images');
      errors.messages.push('Gambar harus berupa array');
    } else {
      const invalidImages = data.images.filter(url => !isValidImageUrl(url));
      if (invalidImages.length > 0) {
        errors.invalidFields.push('images');
        errors.messages.push('URL gambar harus diawali dengan http dan berakhiran .jpg, .jpeg, .png, atau .webp');
      }
    }
  }

  // Validasi field yang tidak boleh diubah saat update
  if (isUpdate) {
    const immutableFields = ['type', 'category'];
    for (const field of immutableFields) {
      if (data[field] !== undefined) {
        errors.invalidFields.push(field);
        errors.messages.push(`Field ${field} tidak dapat diubah`);
      }
    }
  }

  return errors;
};

// Sanitasi data layanan
const sanitizeService = (data, isUpdate = false) => {
  const sanitized = {};

  if (!isUpdate) {
    // Default fields untuk layanan baru
    sanitized.type = "service";
    sanitized.category = "Jasa";
    sanitized.rating = 0;
    sanitized.soldCount = 0;
    sanitized.badges = [];
  }

  // Sanitasi field yang diupdate
  if (data.name) sanitized.name = String(data.name).trim();
  if (data.price) sanitized.price = parseFloat(data.price);
  if (data.unit) sanitized.unit = String(data.unit).trim();
  if (data.images) sanitized.images = Array.isArray(data.images) ? data.images : [];
  if (data.badges) sanitized.badges = Array.isArray(data.badges) ? data.badges : [];
  if (data.rating !== undefined) sanitized.rating = parseFloat(data.rating) || 0;
  if (data.soldCount !== undefined) sanitized.soldCount = parseInt(data.soldCount) || 0;

  // Update timestamp
  sanitized.updatedAt = admin.firestore.FieldValue.serverTimestamp();
  if (!isUpdate) {
    sanitized.createdAt = admin.firestore.FieldValue.serverTimestamp();
  }

  return sanitized;
};

// POST: Tambah layanan (Admin only)
router.post('/services', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Validasi data
    const validation = validateService(req.body);
    if (validation.messages.length > 0) {
      return res.status(400).json({
        error: 'Validasi gagal',
        message: validation.messages[0],
        invalidFields: validation.invalidFields
      });
    }

    // Sanitasi data
    const serviceData = sanitizeService(req.body);

    // Simpan ke Firestore
    const docRef = await db.collection('products').add(serviceData);
    
    // Return created service
    const createdService = {
      id: docRef.id,
      ...serviceData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json(createdService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      error: 'Gagal membuat layanan',
      message: 'Terjadi kesalahan internal saat membuat layanan',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET: Semua layanan dengan filter dan pagination
router.get('/services', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = 'createdAt_desc',
      type = 'service',
      unit,
      badges
    } = req.query;

    console.log('GET /services called with params:', req.query);

    // Validate pagination params
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({
        error: 'Parameter tidak valid',
        message: 'Parameter page dan limit harus berupa angka positif'
      });
    }

    // Start with base query for services
    let query = db.collection('products').where('type', '==', 'service');

    // Execute the base query first
    const snapshot = await query.get();
    console.log('Found', snapshot.size, 'services in database');
    
    let services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));

    console.log('Raw services from Firestore:');
    services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name} - Type: ${service.type}`);
    });

    // Apply filters in memory to avoid complex Firestore queries
    if (unit && VALID_UNITS.includes(unit)) {
      services = services.filter(service => service.unit === unit);
      console.log(`After unit filter (${unit}):`, services.length, 'services');
    }

    if (badges) {
      const badgesArray = Array.isArray(badges) ? badges : [badges];
      if (badgesArray.length > 0) {
        services = services.filter(service => 
          service.badges && service.badges.some(badge => badgesArray.includes(badge))
        );
        console.log(`After badges filter (${badgesArray.join(', ')}):`, services.length, 'services');
      }
    }

    // Apply sorting
    const [sortField, sortDirection] = sort.split('_');
    const validSortFields = ['price', 'rating', 'createdAt', 'name'];
    const validSortDirections = ['asc', 'desc'];

    if (validSortFields.includes(sortField) && validSortDirections.includes(sortDirection)) {
      services.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (sortField === 'createdAt') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        
        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    // Apply pagination to filtered and sorted results
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedServices = services.slice(startIndex, startIndex + limitNum);

    console.log(`Found ${services.length} services out of ${snapshot.size} total`);

    return res.status(200).json({
      data: paginatedServices,
      total: services.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(services.length / limitNum)
    });
  } catch (error) {
    console.error('Error fetching services:', error.stack || error);
    res.status(500).json({
      error: 'Gagal mengambil layanan',
      message: 'Terjadi kesalahan internal saat mengambil data layanan'
    });
  }
});

// GET: Detail layanan by ID
router.get('/services/:id', async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        error: 'Layanan tidak ditemukan',
        message: 'Layanan dengan ID tersebut tidak ditemukan'
      });
    }

    const serviceData = doc.data();
    
    // Verify it's a service type
    if (serviceData.type !== 'service') {
      return res.status(404).json({
        error: 'Layanan tidak ditemukan',
        message: 'ID tersebut bukan merupakan layanan'
      });
    }

    const service = {
      id: doc.id,
      ...serviceData,
      createdAt: serviceData.createdAt?.toDate(),
      updatedAt: serviceData.updatedAt?.toDate()
    };

    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      error: 'Gagal mengambil layanan',
      message: 'Terjadi kesalahan internal saat mengambil detail layanan'
    });
  }
});

// PUT: Update layanan (Admin only)
router.put('/services/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if service exists
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        error: 'Layanan tidak ditemukan',
        message: 'Layanan dengan ID tersebut tidak ditemukan'
      });
    }

    // Verify it's a service type
    const serviceData = doc.data();
    if (serviceData.type !== 'service') {
      return res.status(404).json({
        error: 'Layanan tidak ditemukan',
        message: 'ID tersebut bukan merupakan layanan'
      });
    }

    // Validate update data
    const validation = validateService(req.body, true);
    if (validation.messages.length > 0) {
      return res.status(400).json({
        error: 'Validasi gagal',
        message: validation.messages[0],
        invalidFields: validation.invalidFields
      });
    }

    // Sanitize update data
    const updateData = sanitizeService(req.body, true);

    // Update document
    await db.collection('products').doc(id).update(updateData);

    // Get updated document
    const updatedDoc = await db.collection('products').doc(id).get();
    const updatedService = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      createdAt: updatedDoc.data().createdAt?.toDate(),
      updatedAt: updatedDoc.data().updatedAt?.toDate()
    };

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      error: 'Gagal mengupdate layanan',
      message: 'Terjadi kesalahan internal saat mengupdate layanan'
    });
  }
});

// DELETE: Hapus layanan (Admin only)
router.delete('/services/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if service exists
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        error: 'Layanan tidak ditemukan',
        message: 'Layanan dengan ID tersebut tidak ditemukan'
      });
    }

    // Verify it's a service type
    const serviceData = doc.data();
    if (serviceData.type !== 'service') {
      return res.status(404).json({
        error: 'Layanan tidak ditemukan',
        message: 'ID tersebut bukan merupakan layanan'
      });
    }

    // Delete the document
    await db.collection('products').doc(id).delete();

    res.status(200).json({
      message: 'Layanan berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      error: 'Gagal menghapus layanan',
      message: 'Terjadi kesalahan internal saat menghapus layanan'
    });
  }
});

module.exports = router;
