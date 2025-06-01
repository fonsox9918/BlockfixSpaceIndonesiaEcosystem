import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper to log API calls
const logApiCall = (method, endpoint, payload = null) => {
  console.log(`🚀 API ${method}:`, endpoint);
  if (payload) console.log('📦 Payload:', payload);
};

// Helper to log API responses
const logApiResponse = (response) => {
  console.log('✅ API Response:', response);
  return response;
};

// Get services with pagination, sorting and filters
export const getServices = async ({ 
  page = 1, 
  limit = 12,
  sort = 'createdAt_desc',
  unit = null,
  badges = []
} = {}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort,
      type: 'service' // Always include type=service
    });

    if (unit) params.append('unit', unit);
    if (badges?.length > 0) {
      badges.forEach(badge => params.append('badges', badge));
    }

    logApiCall('GET', `/services?${params}`);
    
    const response = await axios.get(`${API_URL}/services?${params}`);
    return logApiResponse({
      data: response.data.data || [],
      total: response.data.total || 0,
      totalPages: response.data.totalPages || 1,
      page: response.data.page || 1
    });
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch services');
  }
};

// Get single service by ID
export const getServiceById = async (id) => {
  try {
    logApiCall('GET', `/services/${id}`);
    const response = await axios.get(`${API_URL}/services/${id}`);
    return logApiResponse(response.data);
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch service');
  }
};

// Create new service
export const createService = async (serviceData) => {
  try {
    // Ensure type is set
    const payload = {
      ...serviceData,
      type: 'service',
      category: 'Jasa'
    };

    logApiCall('POST', '/services', payload);
    const response = await axios.post(`${API_URL}/services`, payload);
    return logApiResponse(response.data);
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to create service');
  }
};

// Update service
export const updateService = async (id, serviceData) => {
  try {
    // Remove immutable fields
    const { type: _type, category: _category, ...updateData } = serviceData;
    
    logApiCall('PUT', `/services/${id}`, updateData);
    const response = await axios.put(`${API_URL}/services/${id}`, updateData);
    return logApiResponse(response.data);
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to update service');
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    logApiCall('DELETE', `/services/${id}`);
    const response = await axios.delete(`${API_URL}/services/${id}`);
    return logApiResponse(response.data);
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to delete service');
  }
};

// Upload service image
export const uploadServiceImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('slug', `service-${Date.now()}`);

    logApiCall('POST', '/upload/product-image', { fileName: file.name });
    
    const response = await axios.post(`${API_URL}/upload/product-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return logApiResponse(response.data.imageURL);
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};

export default {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  uploadServiceImage
};
