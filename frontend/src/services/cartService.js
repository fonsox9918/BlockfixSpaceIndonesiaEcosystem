// src/services/cartService.js
import { auth } from '../firebase/firebaseConfig';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to get auth token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  return await user.getIdToken();
};

// Helper function to make authenticated API calls
const makeAuthenticatedRequest = async (url, options = {}) => {
  try {
    console.log('🔐 Getting auth token...');
    const token = await getAuthToken();
    console.log('✅ Auth token retrieved successfully');
    
    const fullUrl = `${API_BASE_URL}${url}`;
    console.log('🌐 Making request to:', fullUrl);
    console.log('📦 Request options:', {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`, // Log partial token for security
      },
      body: options.body
    });
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('📄 Response data:', data);

    if (!response.ok) {
      const errorMessage = data.message || `HTTP error! status: ${response.status}`;
      console.error('❌ API request failed with error:', {
        status: response.status,
        statusText: response.statusText,
        errorMessage,
        responseData: data,
        url: fullUrl
      });
      throw new Error(errorMessage);
    }

    console.log('✅ API request successful');
    return data;
  } catch (error) {
    console.error('💥 Failed to add item to cart:', {
      errorMessage: error.message,
      errorStack: error.stack,
      errorResponse: error.response?.data || 'No response data',
      url: `${API_BASE_URL}${url}`,
      requestOptions: options
    });
    throw error;
  }
};

// Cart service functions
export const cartService = {
  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    console.log('🛒 Adding to cart:', { productId, quantity });
    try {
      const result = await makeAuthenticatedRequest('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          productId,
          quantity
        })
      });
      console.log('✅ Successfully added to cart:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to add to cart:', error);
      throw error;
    }
  },

  // Get cart contents
  getCart: async () => {
    return await makeAuthenticatedRequest('/api/cart', {
      method: 'GET'
    });
  },

  // Update item quantity in cart
  updateCartItem: async (productId, quantity) => {
    return await makeAuthenticatedRequest('/api/cart/update', {
      method: 'PUT',
      body: JSON.stringify({
        productId,
        quantity
      })
    });
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    return await makeAuthenticatedRequest('/api/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({
        productId
      })
    });
  },

  // Clear entire cart
  clearCart: async () => {
    return await makeAuthenticatedRequest('/api/cart/clear', {
      method: 'DELETE'
    });
  }
};

export default cartService;
