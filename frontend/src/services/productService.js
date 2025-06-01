// src/services/productService.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Get all products with pagination and filters
export const getAllProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  // Add pagination
  queryParams.append('page', params.page || '1');
  queryParams.append('limit', params.limit || '12');
  
  // Add sorting
  queryParams.append('sort', params.sort || 'createdAt_desc');
  
  // Add filters - make sure type is always included
  if (params.category) queryParams.append('category', params.category);
  if (params.unit) queryParams.append('unit', params.unit);
  if (params.badges) queryParams.append('badges', params.badges);
  if (params.search) queryParams.append('search', params.search);
  if (params.minPrice) queryParams.append('minPrice', params.minPrice);
  if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
  
  // Always include type parameter if provided
  if (params.type) {
    queryParams.append('type', params.type);
  }
  
  console.log('productService: Request params:', params);
  console.log('productService: Query string:', queryParams.toString());
  
  const response = await apiCall(`/products?${queryParams.toString()}`);
  console.log('productService: Raw API response:', response);
  console.log('productService: Response keys:', Object.keys(response));
  console.log('productService: Response.products:', response.products);
  console.log('productService: Response.data:', response.data);
  
  const result = {
    data: response.products || response.data || [],
    products: response.products || response.data || [], // Add both for compatibility
    totalPages: response.pagination?.totalPages || 1,
    total: response.pagination?.total || 0
  };
  console.log('productService: Transformed response:', result);
  return result;
};

// Get single product by ID
export const getProductById = async (id) => {
  return await apiCall(`/products/${id}`);
};

// Create new product
export const createProduct = async (productData) => {
  return await apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

// Update existing product
export const updateProduct = async (id, productData) => {
  return await apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

// Delete product
export const deleteProduct = async (id) => {
  return await apiCall(`/products/${id}`, {
    method: 'DELETE',
  });
};

// Upload product image
export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('slug', 'product-' + Date.now());
  
  try {
    const response = await fetch(`${API_BASE_URL}/upload/product-image`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Upload failed');
    }
    
    const result = await response.json();
    return result.imageURL;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files) => {
  const uploadPromises = files.map(file => uploadProductImage(file));
  return await Promise.all(uploadPromises);
};

// Get product statistics
export const getProductStats = async () => {
  return await apiCall('/products/stats');
};

// Search products
export const searchProducts = async (query, filters = {}) => {
  const params = {
    search: query,
    ...filters,
  };
  return await getAllProducts(params);
};

// Get products by category
export const getProductsByCategory = async (category, params = {}) => {
  return await getAllProducts({
    category,
    ...params,
  });
};

// Get featured products
export const getFeaturedProducts = async (limit = 8) => {
  return await getAllProducts({
    badges: 'best_seller,trending',
    limit,
  });
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  uploadMultipleImages,
  getProductStats,
  searchProducts,
  getProductsByCategory,
  getFeaturedProducts,
};
