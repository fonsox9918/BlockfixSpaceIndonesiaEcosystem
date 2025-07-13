# Blockfix Node.js Backend Server

A comprehensive Node.js backend server for the Blockfix fullstack application with Express, Firestore, and CORS support.

## 🚀 Features

- **Express.js** - Fast, unopinionated web framework
- **Google Cloud Firestore** - NoSQL document database
- **CORS** - Cross-Origin Resource Sharing support
- **Nodemon** - Automatic server restart during development
- **Error Handling** - Comprehensive error handling middleware
- **Health Checks** - Built-in health monitoring endpoints

## 📦 Dependencies

### Production Dependencies
- `express` - Web application framework
- `@google-cloud/firestore` - Google Cloud Firestore client
- `cors` - CORS middleware

### Development Dependencies
- `nodemon` - Development server with auto-restart
- `concurrently` - Run multiple commands concurrently

## 🛠️ Installation

1. **Initialize the project** (if not already done):
   ```bash
   npm init -y
   ```

2. **Install dependencies**:
   ```bash
   npm install express @google-cloud/firestore cors nodemon
   ```

3. **Configure Firestore** (update `firestore-config.js`):
   ```javascript
   const { Firestore } = require('@google-cloud/firestore');
   
   const firestore = new Firestore({
     projectId: 'your-actual-project-id',
     keyFilename: './path/to/your/service-account-key.json',
   });
   ```

## 🏃‍♂️ Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Run All Services (Frontend + Backend + AI)
```bash
npm run dev-all
```

## 📡 API Endpoints

### Core Endpoints
- `GET /` - Server status and information
- `GET /health` - Health check endpoint
- `GET /test-firestore` - Test Firestore connection

### API Endpoints
- `GET /api/products` - Products API endpoint
- `GET /api/services` - Services API endpoint

### Error Handling
- `404` - Route not found handler
- `500` - Internal server error handler

## 🧪 Testing

### Manual Testing with cURL

1. **Test server status**:
   ```bash
   curl http://localhost:5000
   ```

2. **Test health check**:
   ```bash
   curl http://localhost:5000/health
   ```

3. **Test Firestore connection**:
   ```bash
   curl http://localhost:5000/test-firestore
   ```

4. **Test API endpoints**:
   ```bash
   curl http://localhost:5000/api/products
   curl http://localhost:5000/api/services
   ```

5. **Test 404 handling**:
   ```bash
   curl http://localhost:5000/nonexistent-route
   ```

### CORS Testing
Open `test-cors.html` in a browser and click "Test CORS Request" to verify CORS functionality.

## 📁 Project Structure

```
blockfix-fullstack/
├── index.js                 # Main server file
├── firestore-config.js      # Firestore configuration
├── package.json             # Project dependencies and scripts
├── test-cors.html          # CORS testing file
├── README.md               # This file
├── frontend/               # React frontend
├── backend-platform/       # Platform backend
└── backend-ai/            # AI backend
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

### Firestore Setup
1. Create a Firebase project
2. Generate a service account key
3. Update `firestore-config.js` with your project details

## 🚦 Server Status

When running successfully, you should see:
```
🚀 Blockfix Backend Server running on port 5000
📍 Server URL: http://localhost:5000
🔥 Environment: development
```

## 📝 Scripts

- `npm start` - Start server in production mode
- `npm run dev` - Start server with nodemon (development)
- `npm run dev-all` - Start all services (frontend, backend, AI)
- `npm test` - Run tests (placeholder)

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**:
   - Change the PORT environment variable
   - Kill existing processes on port 5000

2. **Firestore connection failed**:
   - Verify project ID in `firestore-config.js`
   - Check service account key path
   - Ensure proper Firebase permissions

3. **CORS issues**:
   - CORS is enabled for all origins in development
   - Configure specific origins for production

## 🤝 Integration

This backend server integrates with:
- **Frontend** (React) - Serves API endpoints
- **Backend Platform** - Complementary backend services
- **Backend AI** - AI-powered features

## 📊 Monitoring

- Health check endpoint: `/health`
- Server uptime tracking
- Error logging and handling
- Request/response logging (can be added)

## 🔐 Security

- CORS protection
- Error message sanitization
- Input validation middleware ready
- Environment-based error details

---

**Status**: ✅ Fully functional and tested
**Version**: 1.0.0
**Last Updated**: 2025-07-11
