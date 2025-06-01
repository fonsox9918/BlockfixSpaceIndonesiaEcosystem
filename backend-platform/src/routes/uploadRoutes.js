// src/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { bucket } = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const router = express.Router();

// Setup multer storage (memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload/product-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const slug = req.body.slug;

    if (!file || !slug) {
      return res.status(400).json({ error: 'File dan slug diperlukan' });
    }

    const extension = path.extname(file.originalname);
    const filename = `products/${slug}/${uuidv4()}${extension}`;
    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Upload gagal' });
    });

    blobStream.on('finish', async () => {
      // Buat file bisa diakses publik
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      res.status(200).json({ imageURL: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat upload gambar' });
  }
});

module.exports = router;
