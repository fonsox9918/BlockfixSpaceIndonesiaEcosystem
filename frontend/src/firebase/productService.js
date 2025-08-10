import axios from 'axios';
const API_BASE = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

const USE_MOCK_DATA = false; // Using real API

// ✅ CREATE produk
export const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

// ✅ READ: Get all products (with optional category filter)
export const getAllProducts = async (category = "") => {
  try {
    const url = category ? `/products?category=${category}` : '/products';
    const response = await api.get(url);
    return response.data.data || response.data.products || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

// ✅ READ: Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product details");
  }
};

// ✅ UPDATE product
export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};

// ✅ DELETE product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete product");
  }
};

// ✅ Upload product image
export const uploadProductImage = async (file, slug) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);

    const response = await api.post('/upload/product-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.imageURL;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
};

// ✅ GET all categories
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};
