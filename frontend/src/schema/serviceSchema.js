import { z } from "zod";

const VALID_UNITS = ["per m²", "per titik", "per item"];
const VALID_BADGES = ["best seller", "new", "hot", "promo", "limited", "trending"];

export const serviceSchema = z.object({
  // Required fields
  name: z.string()
    .min(3, "Nama layanan minimal 3 karakter")
    .max(100, "Nama layanan maksimal 100 karakter"),
  
  price: z.coerce
    .number({ required_error: "Harga wajib diisi" })
    .min(1000, "Harga minimal Rp 1.000"),
  
  unit: z.enum(VALID_UNITS, {
    required_error: "Unit wajib dipilih",
    invalid_type_error: `Unit harus salah satu dari: ${VALID_UNITS.join(", ")}`
  }),
  
  // Optional fields with defaults
  description: z.string().max(2000).optional(),
  
  stock: z.coerce
    .number()
    .min(0, "Stok tidak boleh negatif")
    .default(0),
  
  badges: z.array(z.enum(VALID_BADGES))
    .default([]),
  
  images: z.array(z.string().url("URL gambar tidak valid"))
    .min(1, "Minimal satu gambar diperlukan"),
  
  // Fixed values
  type: z.literal("service").default("service"),
  category: z.literal("Jasa").default("Jasa"),
  
  // Auto-managed fields
  rating: z.number().min(0).max(5).default(0),
  soldCount: z.number().min(0).default(0)
});

// For update - all fields optional except immutable ones
export const serviceUpdateSchema = serviceSchema.partial().extend({
  type: z.literal("service"),
  category: z.literal("Jasa")
});

// Export options for dropdowns
export const UNIT_OPTIONS = VALID_UNITS.map(unit => ({
  label: unit,
  value: unit
}));

export const BADGE_OPTIONS = VALID_BADGES.map(badge => ({
  label: badge.charAt(0).toUpperCase() + badge.slice(1),
  value: badge
}));
