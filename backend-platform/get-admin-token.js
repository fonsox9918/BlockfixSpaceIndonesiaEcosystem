const admin = require('firebase-admin');
const serviceAccount = require('../blockfix-tools/serviceAccountKey.json');

// Initialize admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function createTestAdminToken() {
  try {
    // The UID from setAdminClaim.js
    const adminUid = 'cw02zYOrGhXxIht974itP7imO403';
    
    // Create a custom token for the admin user
    const customToken = await admin.auth().createCustomToken(adminUid, {
      role: 'admin'
    });
    
    console.log('✅ Admin custom token created:');
    console.log(customToken);
    console.log('\n📝 Use this token for testing admin endpoints');
    console.log('Note: This is a custom token, not an ID token. For real testing, you need to exchange this for an ID token via Firebase Auth.');
    
    return customToken;
  } catch (error) {
    console.error('❌ Error creating admin token:', error);
  }
}

async function verifyAdminUser() {
  try {
    const adminUid = 'cw02zYOrGhXxIht974itP7imO403';
    const userRecord = await admin.auth().getUser(adminUid);
    
    console.log('\n👤 Admin user details:');
    console.log('UID:', userRecord.uid);
    console.log('Email:', userRecord.email);
    console.log('Custom Claims:', userRecord.customClaims);
    
    if (userRecord.customClaims?.role === 'admin') {
      console.log('✅ User has admin role');
    } else {
      console.log('❌ User does not have admin role');
      console.log('Run: cd blockfix-tools && node setAdminClaim.js');
    }
    
  } catch (error) {
    console.error('❌ Error verifying admin user:', error);
  }
}

async function main() {
  console.log('🔑 Admin Token Generator\n');
  
  await verifyAdminUser();
  await createTestAdminToken();
  
  console.log('\n💡 For actual testing:');
  console.log('1. Use Firebase SDK in frontend to sign in as admin user');
  console.log('2. Call user.getIdToken() to get ID token');
  console.log('3. Use that ID token in Authorization header');
  
  process.exit(0);
}

main().catch(console.error);
