// src/services/orderService.js
import { auth } from '../firebase/firebaseConfig';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

class OrderService {
  // Get authentication token
  async getAuthToken() {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return await user.getIdToken();
  }

  // Create order from cart
  async createOrder(shippingAddress) {
    try {
      console.log('🛒 Creating order with shipping address:', shippingAddress);
      
      const token = await this.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          shippingAddress: shippingAddress
        })
      });

      const data = await response.json();
      
      console.log('📦 Order creation response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      return data;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  }

  // Get user's orders
  async getOrders() {
    try {
      console.log('📋 Fetching user orders...');
      
      const token = await this.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      console.log('📋 Orders fetched:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      return data;
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      throw error;
    }
  }

  // Get specific order details
  async getOrderById(orderId) {
    try {
      console.log(`📋 Fetching order details for: ${orderId}`);
      
      const token = await this.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      console.log('📋 Order details fetched:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch order details');
      }

      return data;
    } catch (error) {
      console.error('❌ Error fetching order details:', error);
      throw error;
    }
  }

  // Cancel order
  async cancelOrder(orderId) {
    try {
      console.log(`❌ Cancelling order: ${orderId}`);
      
      const token = await this.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      console.log('❌ Order cancellation response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel order');
      }

      return data;
    } catch (error) {
      console.error('❌ Error cancelling order:', error);
      throw error;
    }
  }

  // Helper method to format order status in Indonesian
  formatOrderStatus(status) {
    const statusMap = {
      'Menunggu Konfirmasi': 'Menunggu Konfirmasi',
      'Dikonfirmasi': 'Dikonfirmasi',
      'Diproses': 'Diproses',
      'Dikirim': 'Dikirim',
      'Selesai': 'Selesai',
      'Dibatalkan': 'Dibatalkan'
    };
    return statusMap[status] || status;
  }

  // Helper method to get status color
  getStatusColor(status) {
    const colorMap = {
      'Menunggu Konfirmasi': 'text-yellow-600 bg-yellow-100',
      'Dikonfirmasi': 'text-blue-600 bg-blue-100',
      'Diproses': 'text-purple-600 bg-purple-100',
      'Dikirim': 'text-indigo-600 bg-indigo-100',
      'Selesai': 'text-green-600 bg-green-100',
      'Dibatalkan': 'text-red-600 bg-red-100'
    };
    return colorMap[status] || 'text-gray-600 bg-gray-100';
  }

  // Helper method to format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  // Helper method to format date
  formatDate(dateString) {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  }
}

// Export singleton instance
export const orderService = new OrderService();
export default orderService;
