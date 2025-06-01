export const mockProducts = [
  {
    id: 1,
    name: "Modern Wall Panel Set",
    description: "Elegant wall panel set with modern design patterns",
    price: 750000,
    originalPrice: 900000,
    discountPercent: 15,
    category: "wall-panel",
    type: "produk",
    images: ["/images/design1.png"],
    rating: 4.8,
    soldCount: 120,
    location: "Jakarta",
    shippingTime: "2-3 days",
    unit: "m2",
    badges: ["Best Seller", "Premium"]
  },
  {
    id: 2,
    name: "Smart LED Light Strip",
    description: "WiFi-enabled LED strip with app control",
    price: 299000,
    category: "smart-device",
    type: "produk",
    images: ["/images/ProductSmart.png"],
    rating: 4.5,
    soldCount: 85,
    location: "Bandung",
    shippingTime: "1-2 days",
    unit: "item",
    badges: ["New"]
  },
  {
    id: 3,
    name: "Premium PVC Ceiling Panel",
    description: "High-quality PVC ceiling panel with moisture resistance",
    price: 450000,
    originalPrice: 500000,
    discountPercent: 10,
    category: "plafond-pvc",
    type: "produk",
    images: ["/images/Design2.png"],
    rating: 4.7,
    soldCount: 200,
    location: "Surabaya",
    shippingTime: "2-4 days",
    unit: "m2",
    badges: ["Popular"]
  },
  {
    id: 4,
    name: "Modular Storage Cabinet",
    description: "Customizable modular storage solution",
    price: 1200000,
    category: "furniture-modular",
    type: "produk",
    images: ["/images/ProductFurniture.png"],
    rating: 4.9,
    soldCount: 45,
    location: "Jakarta",
    shippingTime: "4-7 days",
    unit: "item",
    badges: ["Premium"]
  }
];

export const mockCategories = [
  { id: "wall-panel", name: "Wall Panel" },
  { id: "plafond-pvc", name: "Plafond PVC" },
  { id: "smart-device", name: "Smart Home Device" },
  { id: "furniture-modular", name: "Furniture Modular" },
  { id: "aksesoris", name: "Aksesoris" },
  { id: "material-pendukung", name: "Material Pendukung" }
];
