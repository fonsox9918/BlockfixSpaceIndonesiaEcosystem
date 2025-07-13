const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore({
  projectId: 'your-project-id', // Replace with your actual Firebase project ID
  keyFilename: './path/to/your/service-account-key.json', // Replace with path to your service account key
});

module.exports = firestore;
