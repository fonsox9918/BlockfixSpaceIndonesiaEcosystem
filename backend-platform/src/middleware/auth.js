const { admin } = require('../config/firebaseConfig');

/**
 * Authentication middleware to verify Firebase ID tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Authorization header is missing'
      });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Invalid token format',
        message: 'Token must be provided in Bearer format'
      });
    }
    
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add user information to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'user',
      emailVerified: decodedToken.email_verified,
      // Add admin check from custom claims
      isAdmin: decodedToken.role === 'admin'
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        error: 'Token expired',
        message: 'Please login again'
      });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({ 
        error: 'Token revoked',
        message: 'Please login again'
      });
    }
    
    return res.status(403).json({ 
      error: 'Invalid token',
      message: 'Authentication failed'
    });
  }
};

/**
 * Authorization middleware to check user roles
 * @param {Array} allowedRoles - Array of allowed roles
 * @returns {Function} Express middleware function
 */
const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please authenticate first'
      });
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        message: `Required role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
};

/**
 * Admin-only middleware
 */
const requireAdmin = requireRole(['admin']);

/**
 * User or Admin middleware
 */
const requireUser = requireRole(['user', 'admin']);

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireUser
};
