const express = require("express");
const { db } = require("../config/firebaseConfig");
const router = express.Router();

// ✅ Log untuk pastikan file ini terbaca
console.log("✅ categoryRoutes loaded");

// Dummy data kategori sebagai fallback
const defaultCategories = [
  { name: "Wall Panel", slug: "wall-panel" },
  { name: "Plafond PVC", slug: "plafond-pvc" },
  { name: "Smart Home Device", slug: "smart-device" },
  { name: "Furniture Modular", slug: "furniture-modular" },
  { name: "Aksesoris", slug: "aksesoris" },
  { name: "Material Pendukung", slug: "material-pendukung" },
];

// ✅ Route: GET /api/categories - Fetch unique categories from Firestore
router.get("/categories", async (req, res) => {
  try {
    console.log("GET /categories called");
    
    // Fetch all products from Firestore
    const productsSnapshot = await db.collection('products').get();
    
    if (productsSnapshot.empty) {
      console.log("No products found, returning default categories");
      return res.status(200).json(defaultCategories.map(cat => cat.name));
    }

    // Extract unique categories from products
    const categoriesSet = new Set();
    
    productsSnapshot.forEach(doc => {
      const product = doc.data();
      if (product.category && product.category.trim() !== '') {
        categoriesSet.add(product.category.trim());
      }
    });

    // Convert Set to Array
    const uniqueCategories = Array.from(categoriesSet).sort();
    
    console.log(`Found ${uniqueCategories.length} unique categories:`, uniqueCategories);
    
    // Return array of category strings
    res.status(200).json(uniqueCategories);
    
  } catch (error) {
    console.error("Error fetching categories from Firestore:", error);
    
    // Return default categories as fallback
    res.status(500).json({ 
      error: "Failed to fetch categories from database",
      message: error.message,
      fallback: defaultCategories.map(cat => cat.name)
    });
  }
});

module.exports = router;
