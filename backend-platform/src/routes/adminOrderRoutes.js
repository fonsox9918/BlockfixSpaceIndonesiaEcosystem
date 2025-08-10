const express = require('express');
const { db } = require('../config/firebaseConfig');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Apply authentication and admin-only middleware to all admin order routes
router.use(authenticateToken);
router.use(requireAdmin);

/**
 * GET /api/admin/orders - Get all orders for admin
 * Fetches ALL orders from Firestore, regardless of user
 * Returns orders sorted by newest first
 */
router.get('/', async (req, res) => {
  try {
    console.log(`Admin ${req.user.email} (${req.user.uid}) requesting all orders`);

    // Get all orders from Firestore
    const ordersRef = db.collection('orders');
    const snapshot = await ordersRef.orderBy('createdAt', 'desc').get();

    if (snapshot.empty) {
      return res.status(200).json({
        success: true,
        message: 'No orders found',
        data: {
          orders: [],
          total: 0
        }
      });
    }

    // Transform Firestore documents to order objects
    const orders = [];
    snapshot.forEach(doc => {
      const orderData = doc.data();
      orders.push({
        orderId: doc.id,
        ...orderData,
        // Ensure dates are properly formatted
        createdAt: orderData.createdAt?.toDate?.() || orderData.createdAt,
        updatedAt: orderData.updatedAt?.toDate?.() || orderData.updatedAt
      });
    });

    console.log(`Retrieved ${orders.length} orders for admin`);

    // Calculate summary statistics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const statusCounts = orders.reduce((counts, order) => {
      const status = order.status || 'Unknown';
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        orders: orders,
        total: orders.length,
        summary: {
          totalRevenue: totalRevenue,
          statusBreakdown: statusCounts,
          recentOrdersCount: orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          }).length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching admin orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/orders/:orderId - Get specific order details
 */
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(`Admin ${req.user.email} requesting order details for: ${orderId}`);

    const orderDoc = await db.collection('orders').doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const orderData = orderDoc.data();
    const order = {
      orderId: orderDoc.id,
      ...orderData,
      createdAt: orderData.createdAt?.toDate?.() || orderData.createdAt,
      updatedAt: orderData.updatedAt?.toDate?.() || orderData.updatedAt
    };

    // Get user details for this order
    let userDetails = null;
    if (order.userId) {
      try {
        const userDoc = await db.collection('users').doc(order.userId).get();
        if (userDoc.exists) {
          userDetails = userDoc.data();
        }
      } catch (userError) {
        console.warn('Could not fetch user details:', userError.message);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order details retrieved successfully',
      data: {
        order: order,
        userDetails: userDetails
      }
    });

  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/orders/:orderId/status - Update order status
 */
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses: ${validStatuses.join(', ')}`
      });
    }

    console.log(`Admin ${req.user.email} updating order ${orderId} status to: ${status}`);

    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    const updateData = {
      status: status,
      updatedAt: new Date().toISOString(),
      lastUpdatedBy: req.user.uid
    };

    if (notes) {
      updateData.adminNotes = notes;
    }

    await orderRef.update(updateData);

    console.log(`Order ${orderId} status updated to ${status} by admin ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        orderId: orderId,
        newStatus: status,
        updatedAt: updateData.updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

module.exports = router;
