const express = require('express');
const { db } = require('../config/firebaseConfig');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all order routes
router.use(authenticateToken);

// POST /api/orders/create - Create order from cart
router.post('/create', async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user.uid;

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.phone) {
      return res.status(400).json({
        success: false,
        message: 'Complete shipping address is required'
      });
    }

    console.log(`Creating order for user: ${userId}`);

    // Get user's cart
    const cartDoc = await db.collection('carts').doc(userId).get();
    
    if (!cartDoc.exists || !cartDoc.data().items || cartDoc.data().items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Cannot create order.'
      });
    }

    const cartData = cartDoc.data();
    const cartItems = cartData.items;

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

    // Generate unique order ID
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const orderId = `ORD-${dateStr}-${randomNum}`;

    // Create order document
    const orderData = {
      orderId: orderId,
      userId: userId,
      items: cartItems,
      totalPrice: totalPrice,
      totalItems: cartData.totalItems || cartItems.reduce((total, item) => total + item.quantity, 0),
      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        phone: shippingAddress.phone,
        notes: shippingAddress.notes || ''
      },
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save order to Firestore
    const orderRef = db.collection('orders').doc(orderId);
    await orderRef.set(orderData);

    // Clear user's cart
    await db.collection('carts').doc(userId).delete();

    console.log(`Order created successfully: ${orderId} for user: ${userId}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: orderData
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// GET /api/orders - Get user's orders
router.get('/', async (req, res) => {
  try {
    const userId = req.user.uid;

    console.log(`Fetching orders for user: ${userId}`);

    // Query orders for the current user
    // Note: For production, create a composite index for userId + createdAt
    let ordersSnapshot;
    try {
      // Try with sorting first
      ordersSnapshot = await db.collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
    } catch (error) {
      if (error.code === 9) { // FAILED_PRECONDITION - missing index
        console.log('⚠️  Composite index not found, fetching without sorting');
        // Fallback: fetch without sorting
        ordersSnapshot = await db.collection('orders')
          .where('userId', '==', userId)
          .get();
      } else {
        throw error;
      }
    }

    const orders = [];
    ordersSnapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`Found ${orders.length} orders for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        orders: orders,
        totalOrders: orders.length
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// GET /api/orders/:orderId - Get specific order details
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.uid;

    console.log(`Fetching order ${orderId} for user: ${userId}`);

    const orderDoc = await db.collection('orders').doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const orderData = orderDoc.data();

    // Verify order belongs to the current user
    if (orderData.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. This order does not belong to you.'
      });
    }

    console.log(`Order ${orderId} retrieved successfully for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: {
        order: {
          id: orderDoc.id,
          ...orderData
        }
      }
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// PUT /api/orders/:orderId/cancel - Cancel order (if status allows)
router.put('/:orderId/cancel', async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.uid;

    console.log(`Cancelling order ${orderId} for user: ${userId}`);

    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const orderData = orderDoc.data();

    // Verify order belongs to the current user
    if (orderData.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. This order does not belong to you.'
      });
    }

    // Check if order can be cancelled
    const cancellableStatuses = ['Menunggu Konfirmasi', 'Dikonfirmasi'];
    if (!cancellableStatuses.includes(orderData.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${orderData.status}`
      });
    }

    // Update order status to cancelled
    await orderRef.update({
      status: 'Dibatalkan',
      updatedAt: new Date().toISOString(),
      cancelledAt: new Date().toISOString()
    });

    console.log(`Order ${orderId} cancelled successfully for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: {
        orderId: orderId,
        status: 'Dibatalkan'
      }
    });

  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
});

module.exports = router;
