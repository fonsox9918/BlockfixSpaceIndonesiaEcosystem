const express = require('express');
const { db, admin } = require('../config/firebaseConfig');
const { authenticateToken, requireAdmin, requireUser } = require('../middleware/auth');

const router = express.Router();

// Validasi URL gambar
const isValidImageUrl = (url) => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  return url.startsWith('http') && validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Constants matching frontend validation
const VALID_CATEGORIES = ["Wall Panel", "Plafond PVC", "Material Pendukung", "Aksesoris", "Smart Home Device", "Furniture Modular"];
const VALID_UNITS = ["per m²", "per titik", "per unit", "per item", "per set"];

// Validasi data produk
const validateProduct = (data, isUpdate = false) => {
  const errors = {
    invalidFields: [],
    messages: []
  };

  // Validasi field yang wajib ada (kecuali untuk update partial)
  if (!isUpdate) {
    const requiredFields = {
      'name': 'nama',
      'price': 'harga',
      'category': 'kategori',
      'type': 'tipe',
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

  // Validate unit
  if (data.unit && !VALID_UNITS.includes(data.unit)) {
    errors.invalidFields.push('unit');
    errors.messages.push(`Unit harus salah satu dari: ${VALID_UNITS.join(', ')}`);
  }

  // Validate stock
  if (data.stock !== undefined) {
    const stockValue = parseInt(data.stock);
    if (isNaN(stockValue) || stockValue < 0) {
      errors.invalidFields.push('stock');
      errors.messages.push('Stok tidak boleh negatif');
    }
  }

  // Jika ada field yang diupdate, validasi nilainya
  if (data.name && data.name.length > 100) {
    errors.invalidFields.push('name');
    errors.messages.push('Nama produk tidak boleh lebih dari 100 karakter');
  }

  if (data.description && data.description.length > 2000) {
    errors.invalidFields.push('description');
    errors.messages.push('Deskripsi tidak boleh lebih dari 2000 karakter');
  }

  if (data.category && !VALID_CATEGORIES.includes(data.category)) {
    errors.invalidFields.push('category');
    errors.messages.push(`Kategori harus salah satu dari: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (data.price) {
    const priceValue = parseFloat(data.price);
    if (isNaN(priceValue) || priceValue < 1000) {
      errors.invalidFields.push('price');
      errors.messages.push('Harga minimal Rp 1.000');
    }
  }

  // Validate originalPrice only if discountPercent > 0
  if (data.originalPrice || (data.discountPercent && parseFloat(data.discountPercent) > 0)) {
    const originalPriceValue = parseFloat(data.originalPrice);
    if (isNaN(originalPriceValue) || originalPriceValue < 1000) {
      errors.invalidFields.push('originalPrice');
      errors.messages.push('Harga asli minimal Rp 1.000');
    }
  }

  if (data.discountPercent !== undefined) {
    const discountValue = parseFloat(data.discountPercent);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
      errors.invalidFields.push('discountPercent');
      errors.messages.push('Persentase diskon harus antara 0 dan 100');
    }
  }

  if (data.rating !== undefined) {
    const ratingValue = parseFloat(data.rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      errors.invalidFields.push('rating');
      errors.messages.push('Rating harus antara 0 dan 5');
    }
  }

  if (data.soldCount !== undefined) {
    const soldCountValue = parseInt(data.soldCount);
    if (isNaN(soldCountValue) || soldCountValue < 0) {
      errors.invalidFields.push('soldCount');
      errors.messages.push('Jumlah terjual tidak boleh negatif');
    }
  }

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

  if (data.badges !== undefined && !Array.isArray(data.badges)) {
    errors.invalidFields.push('badges');
    errors.messages.push('Badges harus berupa array');
  }

  return errors;
};

// Sanitasi data produk
const sanitizeProduct = (data, isUpdate = false) => {
  const sanitized = {};

  // Daftar field yang diperbolehkan
  const allowedFields = [
    'name', 'description', 'price', 'originalPrice', 'discountPercent',
    'category', 'type', 'images', 'rating', 'soldCount', 'stock', 'location',
    'shippingEstimate', 'unit', 'badges'
  ];

  // Sanitasi setiap field yang ada
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      switch (field) {
        case 'name':
        case 'description':
        case 'category':
        case 'type':
        case 'location':
        case 'shippingEstimate':
        case 'unit':
          sanitized[field] = String(data[field]).trim();
          break;
        case 'price':
        case 'originalPrice':
          sanitized[field] = parseFloat(data[field]);
          break;
        case 'discountPercent':
        case 'rating':
          sanitized[field] = data[field] ? parseFloat(data[field]) : null;
          break;
        case 'soldCount':
        case 'stock':
          sanitized[field] = data[field] ? parseInt(data[field]) : 0;
          break;
        case 'images':
        case 'badges':
          sanitized[field] = Array.isArray(data[field]) ? data[field] : [];
          break;
      }
    } else if (!isUpdate) {
      // Set default values for new products
      switch (field) {
        case 'description':
        case 'location':
        case 'shippingEstimate':
          sanitized[field] = '';
          break;
        case 'originalPrice':
        case 'discountPercent':
          sanitized[field] = null;
          break;
        case 'rating':
        case 'soldCount':
        case 'stock':
          sanitized[field] = 0;
          break;
        case 'badges':
          sanitized[field] = [];
          break;
      }
    }
  }

  // Tambah timestamps
  if (!isUpdate) {
    sanitized.createdAt = admin.firestore.FieldValue.serverTimestamp();
  }
  sanitized.updatedAt = admin.firestore.FieldValue.serverTimestamp();

  return sanitized;
};

// POST: Tambah produk (Admin only)
router.post('/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Validasi data
    const validation = validateProduct(req.body);
    if (validation.messages.length > 0) {
      return res.status(400).json({
        error: 'Validasi gagal',
        message: validation.messages[0],
        invalidFields: validation.invalidFields
      });
    }

    // Sanitasi data
    const productData = sanitizeProduct(req.body);

    // Simpan ke Firestore
    const docRef = await db.collection('products').add(productData);
    
    // Return created product
    const createdProduct = {
      id: docRef.id,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      error: 'Gagal membuat produk',
      message: 'Terjadi kesalahan internal saat membuat produk',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET: Semua produk dengan filter, pagination, dan sorting
router.get('/products', async (req, res) => {
  try {
    const {
      category,
      type,
      unit,
      search,
      page = 1,
      limit = 12,
      sort = 'createdAt_desc'
    } = req.query;

    console.log('GET /products called with params:', req.query);
    console.log('Type parameter received:', type);
    console.log('All query params:', Object.keys(req.query));

    // Validate pagination params
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({
        error: 'Parameter tidak valid',
        message: 'Parameter page dan limit harus berupa angka positif'
      });
    }

    // Build query
    let query = db.collection('products');

    // Apply category filter
    if (category) {
      if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({
          error: 'Kategori tidak valid',
          message: `Kategori harus salah satu dari: ${VALID_CATEGORIES.join(', ')}`
        });
      }
      console.log('Filtering by category:', category);
      query = query.where('category', '==', category);
    }

    // Apply unit filter
    if (unit) {
      if (!VALID_UNITS.includes(unit)) {
        return res.status(400).json({
          error: 'Unit tidak valid',
          message: `Unit harus salah satu dari: ${VALID_UNITS.join(', ')}`
        });
      }
      console.log('Filtering by unit:', unit);
      query = query.where('unit', '==', unit);
    }

    // Apply sorting
    const [sortField, sortDirection] = sort.split('_');
    const validSortFields = ['price', 'createdAt', 'rating'];
    const validSortDirections = ['asc', 'desc'];

    if (!validSortFields.includes(sortField) || !validSortDirections.includes(sortDirection)) {
      return res.status(400).json({
        error: 'Parameter sort tidak valid',
        message: 'Format sort yang valid: price_asc, price_desc, createdAt_desc, rating_desc'
      });
    }

    query = query.orderBy(sortField, sortDirection);

    // Get total count for pagination (before applying pagination)
    const totalSnapshot = await query.count().get();
    const total = totalSnapshot.data().count;

    // Apply pagination
    const offset = (pageNum - 1) * limitNum;
    query = query.offset(offset).limit(limitNum);

    // Execute query
    const snapshot = await query.get();
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));

    console.log('Raw products from Firestore:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - Type: ${product.type}`);
    });

    // Apply search filter (client-side filtering)
    if (search) {
      console.log('Filtering by search term:', search);
      const searchLower = search.toLowerCase();
      products = products.filter(product => 
        product.name?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower)
      );
    }

    console.log(`Found ${products.length} products out of ${total} total`);

    // Calculate total after client-side filtering
    const filteredTotal = search ? products.length : total;
    res.status(200).json({
      data: products,
      products: products, // Keep both for compatibility
      pagination: {
        total: filteredTotal,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(filteredTotal / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Gagal mengambil produk',
      message: 'Terjadi kesalahan internal saat mengambil data produk'
    });
  }
});

// GET: Detail produk by ID
router.get('/products/:id', async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({
        error: 'Produk tidak ditemukan',
        message: 'Produk dengan ID tersebut tidak ditemukan'
      });
    }

    const product = {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    };

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      error: 'Gagal mengambil produk',
      message: 'Terjadi kesalahan internal saat mengambil detail produk'
    });
  }
});

// PUT: Update produk (Admin only)
router.put('/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        error: 'Produk tidak ditemukan',
        message: 'Produk dengan ID tersebut tidak ditemukan'
      });
    }

    // Validate update data
    const validation = validateProduct(req.body, true);
    if (validation.messages.length > 0) {
      return res.status(400).json({
        error: 'Validasi gagal',
        message: validation.messages[0],
        invalidFields: validation.invalidFields
      });
    }

    // Sanitize update data
    const updateData = sanitizeProduct(req.body, true);

    // Update document
    await db.collection('products').doc(id).update(updateData);

    // Get updated document
    const updatedDoc = await db.collection('products').doc(id).get();
    const updatedProduct = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      createdAt: updatedDoc.data().createdAt?.toDate(),
      updatedAt: updatedDoc.data().updatedAt?.toDate()
    };

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: 'Gagal mengupdate produk',
      message: 'Terjadi kesalahan internal saat mengupdate produk'
    });
  }
});

// DELETE: Hapus produk (Admin only)
router.delete('/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({
        error: 'Produk tidak ditemukan',
        message: 'Produk dengan ID tersebut tidak ditemukan'
      });
    }

    // Delete the document
    await db.collection('products').doc(id).delete();

    res.status(200).json({
      message: 'Produk berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      error: 'Gagal menghapus produk',
      message: 'Terjadi kesalahan internal saat menghapus produk'
    });
  }
});

module.exports = router;
