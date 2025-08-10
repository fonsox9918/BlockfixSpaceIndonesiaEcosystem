// src/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { bucket } = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Setup multer storage (memory) with security configurations
const storage = multer.memoryStorage();

// File filter function for security
const fileFilter = (req, file, cb) => {
  // Define allowed MIME types
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp'
  ];
  
  // Check MIME type
  if (allowedMimeTypes.includes(file.mimetype)) {
    // Additional check: verify file extension matches MIME type
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const validExtensions = {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    };
    
    if (validExtensions[file.mimetype] && validExtensions[file.mimetype].includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('File extension does not match MIME type'), false);
    }
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Only allow 1 file per request
    fields: 10, // Limit number of non-file fields
    fieldNameSize: 100, // Limit field name size
    fieldSize: 1024 * 1024 // 1MB limit for field values
  },
  fileFilter: fileFilter
});

router.post('/upload/product-image', authenticateToken, requireAdmin, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    // Handle multer errors
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          error: 'File terlalu besar', 
          message: 'Ukuran file maksimal 5MB' 
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ 
          error: 'Terlalu banyak file', 
          message: 'Hanya boleh upload 1 file' 
        });
      }
      return res.status(400).json({ 
        error: 'Upload error', 
        message: err.message 
      });
    } else if (err) {
      return res.status(400).json({ 
        error: 'File validation failed', 
        message: err.message 
      });
    }

    try {
      const file = req.file;
      const slug = req.body.slug;

      if (!file || !slug) {
        return res.status(400).json({ 
          error: 'File dan slug diperlukan',
          message: 'Pastikan file gambar dan slug produk telah diisi'
        });
      }

      // Additional security: validate slug format
      if (!/^[a-zA-Z0-9-_]+$/.test(slug)) {
        return res.status(400).json({ 
          error: 'Invalid slug format',
          message: 'Slug hanya boleh berisi huruf, angka, dash, dan underscore'
        });
      }

      const extension = path.extname(file.originalname).toLowerCase();
      const filename = `products/${slug}/${uuidv4()}${extension}`;
      const blob = bucket.file(filename);

      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          cacheControl: 'public, max-age=31536000' // Cache for 1 year
        }
      });

      blobStream.on('error', (err) => {
        console.error('Storage upload error:', err);
        res.status(500).json({ 
          error: 'Upload gagal',
          message: 'Terjadi kesalahan saat menyimpan file'
        });
      });

      blobStream.on('finish', async () => {
        try {
          // Make file publicly accessible
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
          
          res.status(200).json({ 
            imageURL: publicUrl,
            filename: filename,
            size: file.size,
            mimetype: file.mimetype
          });
        } catch (error) {
          console.error('Error making file public:', error);
          res.status(500).json({ 
            error: 'Upload berhasil tapi gagal membuat file publik',
            message: 'File berhasil diupload tapi tidak dapat diakses publik'
          });
        }
      });

      blobStream.end(file.buffer);
    } catch (error) {
      console.error('Upload processing error:', error);
      res.status(500).json({ 
        error: 'Terjadi kesalahan saat upload gambar',
        message: 'Internal server error during file processing'
      });
    }
  });
});

module.exports = router;
