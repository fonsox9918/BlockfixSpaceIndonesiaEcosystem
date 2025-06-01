const express = require("express");
const router = express.Router();

// ✅ Log untuk pastikan file ini terbaca
console.log("✅ categoryRoutes loaded");

// Dummy data kategori tetap
const defaultCategories = [
  { name: "Wall Panel", slug: "wall-panel" },
  { name: "Plafond PVC", slug: "plafond-pvc" },
  { name: "Smart Home Device", slug: "smart-device" },
  { name: "Furniture Modular", slug: "furniture-modular" },
  { name: "Aksesoris", slug: "aksesoris" },
  { name: "Material Pendukung", slug: "material-pendukung" },
];

// ✅ Route: GET /api/categories
router.get("/categories", (req, res) => {
  try {
    res.status(200).json(defaultCategories);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil kategori" });
  }
});

module.exports = router;
