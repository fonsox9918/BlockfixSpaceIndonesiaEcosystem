# Admin Order Management API Documentation

## Overview
This API provides admin-only endpoints for managing orders in the BlockFix platform. All endpoints require admin authentication.

## Base URL
```
http://localhost:3000/api/admin/orders
```

## Authentication
All endpoints require:
1. **Firebase ID Token** in Authorization header: `Bearer <token>`
2. **Admin Role** - User must have `role: 'admin'` custom claim set in Firebase

### Setting Admin Role
Use the provided script to set admin role:
```bash
cd blockfix-tools
node setAdminClaim.js
```

## Endpoints

### 1. Get All Orders
**GET** `/api/admin/orders`

Retrieves all orders from all users, sorted by newest first.

#### Headers
```
Authorization: Bearer <admin_firebase_token>
Content-Type: application/json
```

#### Response
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": {
    "orders": [
      {
        "orderId": "order_123",
        "userId": "user_456",
        "status": "Menunggu Konfirmasi",
        "totalPrice": 2500000,
        "totalItems": 3,
        "items": [
          {
            "productId": "prod_789",
            "productName": "Wall Panel WPC",
            "quantity": 2,
            "productPrice": 1000000
          }
        ],
        "shippingAddress": {
          "fullName": "John Doe",
          "address": "Jl. Sudirman No. 123",
          "city": "Jakarta",
          "postalCode": "12345",
          "phone": "081234567890"
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "summary": {
      "totalRevenue": 2500000,
      "statusBreakdown": {
        "Menunggu Konfirmasi": 1
      },
      "recentOrdersCount": 1
    }
  }
}
```

#### Error Responses
- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: User is not admin
- **500 Internal Server Error**: Server error

---

### 2. Get Order Details
**GET** `/api/admin/orders/:orderId`

Retrieves detailed information about a specific order, including user details.

#### Parameters
- `orderId` (string): The order ID

#### Headers
```
Authorization: Bearer <admin_firebase_token>
Content-Type: application/json
```

#### Response
```json
{
  "success": true,
  "message": "Order details retrieved successfully",
  "data": {
    "order": {
      "orderId": "order_123",
      "userId": "user_456",
      "status": "Menunggu Konfirmasi",
      "totalPrice": 2500000,
      "items": [...],
      "shippingAddress": {...},
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "userDetails": {
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "081234567890"
    }
  }
}
```

#### Error Responses
- **404 Not Found**: Order not found
- **401/403**: Authentication/Authorization errors

---

### 3. Update Order Status
**PUT** `/api/admin/orders/:orderId/status`

Updates the status of an order.

#### Parameters
- `orderId` (string): The order ID

#### Headers
```
Authorization: Bearer <admin_firebase_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "status": "Dikonfirmasi",
  "notes": "Order confirmed and ready for processing"
}
```

#### Valid Status Values
- `Menunggu Konfirmasi`
- `Dikonfirmasi`
- `Diproses`
- `Dikirim`
- `Selesai`
- `Dibatalkan`

#### Response
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "orderId": "order_123",
    "newStatus": "Dikonfirmasi",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

#### Error Responses
- **400 Bad Request**: Invalid status or missing required fields
- **404 Not Found**: Order not found

## Testing

### Using cURL
```bash
# Test without authentication (should fail)
curl -X GET http://localhost:3000/api/admin/orders

# Test with admin token
curl -X GET http://localhost:3000/api/admin/orders \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json"

# Update order status
curl -X PUT http://localhost:3000/api/admin/orders/ORDER_ID/status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "Dikonfirmasi", "notes": "Confirmed by admin"}'
```

### Using Test Script
```bash
cd backend-platform
node test-admin-orders.js
```

## Security Features

1. **Authentication Required**: All endpoints require valid Firebase ID token
2. **Admin Authorization**: Only users with admin role can access
3. **Rate Limiting**: Protected by Express rate limiting middleware
4. **Input Validation**: Status values are validated
5. **Audit Trail**: Updates include admin user ID and timestamp

## Integration with Frontend

To integrate with the admin panel:

1. **Admin Login**: Ensure admin users authenticate with Firebase
2. **Token Management**: Store and refresh Firebase ID tokens
3. **API Service**: Create admin service layer for API calls
4. **Error Handling**: Handle 401/403 errors appropriately
5. **Real-time Updates**: Consider implementing WebSocket for live order updates

## Database Structure

Orders are stored in Firestore collection `orders` with structure:
```javascript
{
  userId: "string",
  status: "string",
  totalPrice: number,
  totalItems: number,
  items: [
    {
      productId: "string",
      productName: "string",
      quantity: number,
      productPrice: number
    }
  ],
  shippingAddress: {
    fullName: "string",
    address: "string",
    city: "string",
    postalCode: "string",
    phone: "string"
  },
  createdAt: "timestamp",
  updatedAt: "timestamp",
  lastUpdatedBy: "string" // Admin UID who last updated
}
```

## Next Steps

1. **Frontend Integration**: Create admin order management UI
2. **Real-time Updates**: Implement WebSocket for live order status
3. **Notifications**: Add email/SMS notifications for status changes
4. **Analytics**: Add order analytics and reporting
5. **Export Features**: Add CSV/PDF export functionality
