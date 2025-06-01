// src/schema/productSchema.js
import { z } from "zod";

// Constants matching backend validation
const VALID_UNITS = ["per m²", "per titik", "per unit", "per item", "per set"];
const VALID_CATEGORIES = ["Wall Panel", "Plafond PVC", "Material Pendukung", "Aksesoris", "Smart Home Device", "Furniture Modular"];
const VALID_LOCATIONS = ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"];
const VALID_BADGES = ["best seller", "new", "promo", "hot", "limited", "trending"];
const VALID_RATINGS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export const productSchema = z.object({
  // Required fields
  name: z.string()
    .min(3, "Nama produk minimal 3 karakter")
    .max(100, "Nama produk maksimal 100 karakter"),
  
  price: z.number()
    .min(1000, "Harga minimal Rp 1.000")
    .or(z.string().regex(/^\d+$/).transform(Number))
    .refine((n) => n >= 1000, "Harga minimal Rp 1.000"),
  
  unit: z.enum(VALID_UNITS, {
    errorMap: () => ({ message: `Unit harus salah satu dari: ${VALID_UNITS.join(", ")}` })
  }),
  
  type: z.literal("product").default("product"),
  
  category: z.enum(VALID_CATEGORIES, {
    errorMap: () => ({ message: `Kategori harus salah satu dari: ${VALID_CATEGORIES.join(", ")}` })
  }),
  
  images: z.array(z.string().url("URL gambar tidak valid"))
    .optional()
    .default([]),

  // Optional fields
  description: z.string()
    .max(2000, "Deskripsi maksimal 2000 karakter")
    .optional(),
  
  originalPrice: z
    .union([z.string(), z.number()])
    .transform(val => val ? Number(val) : undefined)
    .refine((val) => val === undefined || val >= 1000, "Harga asli minimal Rp 1.000")
    .optional(),
  
  discountPercent: z
    .union([z.string(), z.number()])
    .transform(val => val ? Number(val) : 0)
    .refine((val) => val >= 0 && val <= 100, "Diskon harus antara 0-100%")
    .default(0),
  
  rating: z.number()
    .min(0, "Rating minimal 0")
    .max(5, "Rating maksimal 5")
    .refine((val) => VALID_RATINGS.includes(val), "Rating harus kelipatan 0.5")
    .default(0),
  
  soldCount: z.number()
    .min(0, "Jumlah terjual tidak boleh negatif")
    .default(0),
  
  stock: z.number()
    .min(0, "Stok tidak boleh negatif")
    .default(0),
  
  location: z.enum(VALID_LOCATIONS, {
    errorMap: () => ({ message: `Lokasi harus salah satu dari: ${VALID_LOCATIONS.join(", ")}` })
  }).optional(),
  
  shippingEstimate: z.string()
    .max(100, "Estimasi pengiriman maksimal 100 karakter")
    .optional(),
  
  badges: z.array(z.enum(VALID_BADGES))
    .default([])
    .optional(),
});

// For update - all fields optional except immutable ones
export const productUpdateSchema = productSchema.partial().extend({
  type: z.literal("product"),
});

// Export options for dropdowns
export const UNIT_OPTIONS = VALID_UNITS.map(unit => ({
  label: unit,
  value: unit
}));

export const CATEGORY_OPTIONS = VALID_CATEGORIES.map(category => ({
  label: category,
  value: category
}));

export const LOCATION_OPTIONS = VALID_LOCATIONS.map(location => ({
  label: location,
  value: location
}));

export const BADGE_OPTIONS = VALID_BADGES.map(badge => ({
  label: badge.charAt(0).toUpperCase() + badge.slice(1),
  value: badge
}));

export const RATING_OPTIONS = VALID_RATINGS.map(rating => ({
  label: rating.toString(),
  value: rating
}));
