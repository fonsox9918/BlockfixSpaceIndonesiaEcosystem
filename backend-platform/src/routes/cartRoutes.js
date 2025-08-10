const express = require('express');
const { db } = require('../config/firebaseConfig');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all cart routes
router.use(authenticateToken);

// POST /api/cart/add - Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.uid;

    // Validate input
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and valid quantity are required'
      });
    }

    console.log(`Adding to cart - User: ${userId}, Product: ${productId}, Quantity: ${quantity}`);

    // Check if product exists
    const productDoc = await db.collection('products').doc(productId).get();
    if (!productDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const productData = productDoc.data();

    // Reference to user's cart
    const cartRef = db.collection('carts').doc(userId);
    const cartDoc = await cartRef.get();

    let cartData = {};
    if (cartDoc.exists) {
      cartData = cartDoc.data();
    }

    // Initialize items array if it doesn't exist
    if (!cartData.items) {
      cartData.items = [];
    }

    // Check if item already exists in cart
    const existingItemIndex = cartData.items.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cartData.items[existingItemIndex].quantity += parseInt(quantity);
      cartData.items[existingItemIndex].updatedAt = new Date().toISOString();
    } else {
      // Add new item to cart
      const newItem = {
        productId,
        productName: productData.name,
        productPrice: productData.price,
        productImage: productData.images && productData.images.length > 0 ? productData.images[0] : null,
        quantity: parseInt(quantity),
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      cartData.items.push(newItem);
    }

    // Update cart metadata
    cartData.userId = userId;
    cartData.updatedAt = new Date().toISOString();
    cartData.totalItems = cartData.items.reduce((total, item) => total + item.quantity, 0);

    // Save to Firestore
    await cartRef.set(cartData);

    console.log(`Cart updated successfully for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: {
        totalItems: cartData.totalItems,
        addedItem: cartData.items.find(item => item.productId === productId)
      }
    });

  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

// GET /api/cart - Get user's cart
router.get('/', async (req, res) => {
  try {
    const userId = req.user.uid;

    console.log(`Fetching cart for user: ${userId}`);

    const cartDoc = await db.collection('carts').doc(userId).get();

    if (!cartDoc.exists) {
      return res.status(200).json({
        success: true,
        message: 'Cart is empty',
        data: {
          items: [],
          totalItems: 0,
          totalAmount: 0
        }
      });
    }

    const cartData = cartDoc.data();
    
    // Calculate total amount
    const totalAmount = cartData.items.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

    console.log(`Cart retrieved successfully for user: ${userId}, Items: ${cartData.items.length}`);

    res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      data: {
        items: cartData.items || [],
        totalItems: cartData.totalItems || 0,
        totalAmount: totalAmount,
        updatedAt: cartData.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
});

// PUT /api/cart/update - Update item quantity in cart
router.put('/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.uid;

    // Validate input
    if (!productId || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and valid quantity are required'
      });
    }

    console.log(`Updating cart - User: ${userId}, Product: ${productId}, New Quantity: ${quantity}`);

    const cartRef = db.collection('carts').doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const cartData = cartDoc.data();
    const itemIndex = cartData.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // If quantity is 0, remove the item
    if (quantity === 0) {
      cartData.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cartData.items[itemIndex].quantity = parseInt(quantity);
      cartData.items[itemIndex].updatedAt = new Date().toISOString();
    }

    // Update cart metadata
    cartData.updatedAt = new Date().toISOString();
    cartData.totalItems = cartData.items.reduce((total, item) => total + item.quantity, 0);

    // Save to Firestore
    await cartRef.set(cartData);

    console.log(`Cart updated successfully for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: {
        totalItems: cartData.totalItems,
        updatedItem: quantity > 0 ? cartData.items.find(item => item.productId === productId) : null
      }
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
});

// DELETE /api/cart/remove - Remove item from cart
router.delete('/remove', async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.uid;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    console.log(`Removing from cart - User: ${userId}, Product: ${productId}`);

    const cartRef = db.collection('carts').doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const cartData = cartDoc.data();
    const itemIndex = cartData.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Remove the item
    const removedItem = cartData.items.splice(itemIndex, 1)[0];

    // Update cart metadata
    cartData.updatedAt = new Date().toISOString();
    cartData.totalItems = cartData.items.reduce((total, item) => total + item.quantity, 0);

    // Save to Firestore
    await cartRef.set(cartData);

    console.log(`Item removed from cart successfully for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: {
        totalItems: cartData.totalItems,
        removedItem: removedItem
      }
    });

  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
});

// DELETE /api/cart/clear - Clear entire cart (bonus endpoint)
router.delete('/clear', async (req, res) => {
  try {
    const userId = req.user.uid;

    console.log(`Clearing cart for user: ${userId}`);

    const cartRef = db.collection('carts').doc(userId);
    
    // Delete the entire cart document
    await cartRef.delete();

    console.log(`Cart cleared successfully for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        totalItems: 0
      }
    });

  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
});

module.exports = router;
