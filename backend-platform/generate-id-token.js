const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCustomToken } = require('firebase/auth');

// Firebase config - using the same config as frontend
const firebaseConfig = {
  apiKey: "AIzaSyBvOKBhJJOJJJJJJJJJJJJJJJJJJJJJJJJ", // Replace with actual API key
  authDomain: "blockfix-ca798.firebaseapp.com",
  projectId: "blockfix-ca798",
  storageBucket: "blockfix-ca798.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function generateIdToken() {
  try {
    // Custom token from previous script
    const customToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc1MjkwOTEwNiwiaWV4cCI6MTc1MjkxMjcwNiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstZmJzdmNAYmxvY2tmaXgtY2E3OTguaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0BibG9ja2ZpeC1jYTc5OC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6ImN3MDJ6WU9yR2hYeElodDk3NGl0UDdpbU80MDMiLCJjbGFpbXMiOnsicm9sZSI6ImFkbWluIn19.bQdj5mApVWhV09MV33Wjk2zkfnT3O9g3-NmRNPttXD_hAPuVtTNu2EOyh6vDLRKjZNUmNEo7T9PkbW_fzQk-jFB5RbQYLC-T9vTzXqF2KaKsMiKKpLaU33ykaB4S-BTTaN82TLHcHJWQOIsyDYxI-f_7M0SN0ZEetbzZC_1m0KjXdFAHKZoswBsn-IQkzgsQMQXmro144YilpFB6dRoNtIH3B2Cyz44DA84DTR2FErK0bIGJKRs_elcG3z_cm0IZkq2UQ6tJwJ5Y9h5tuuF65YkH4eRxqcTt-pNF6Hzv2so-Q57ekAjr_TKsMtoyArz-WIbeqMQfGzA6w75R53aKXg";
    
    // Sign in with custom token
    const userCredential = await signInWithCustomToken(auth, customToken);
    const user = userCredential.user;
    
    // Get ID token
    const idToken = await user.getIdToken();
    
    console.log('✅ Successfully generated ID token');
    console.log('User:', user.email);
    console.log('UID:', user.uid);
    console.log('\n🔑 ID Token:');
    console.log(idToken);
    
    return idToken;
    
  } catch (error) {
    console.error('❌ Error generating ID token:', error);
    console.log('\n💡 Alternative: Use a simpler approach for testing');
    console.log('Since we control the backend, we can create a test endpoint that bypasses auth for testing');
  }
}

generateIdToken().then(() => {
  process.exit(0);
}).catch(console.error);
