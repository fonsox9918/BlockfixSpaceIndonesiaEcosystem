import { storage } from '../firebase/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

// Function to get Firebase Storage download URL
export const getFirebaseImageUrl = async (firebaseUrl) => {
  try {
    // Extract path from Firebase Storage URL
    const urlParts = firebaseUrl.split('/products/');
    if (urlParts.length < 2) return null;
    
    const pathPart = urlParts[1];
    const storagePath = `products/${pathPart}`;
    
    // Get download URL using Firebase SDK
    const storageRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting Firebase image URL:', error);
    return null;
  }
};

// Function to check if URL is valid (not dummy)
export const isValidImageUrl = (imageUrl) => {
  if (!imageUrl || 
      imageUrl.includes('example.com') || 
      imageUrl.includes('localhost') ||
      imageUrl === '' ||
      imageUrl === null) {
    return false;
  }
  return true;
};

// Function to check if URL is Firebase Storage URL
export const isFirebaseStorageUrl = (imageUrl) => {
  return imageUrl && 
         imageUrl.includes('storage.googleapis.com') && 
         imageUrl.includes('blockfix-ca798.firebasestorage.app');
};

// Main function to process image URL
export const processImageUrl = async (imageUrl) => {
  if (!isValidImageUrl(imageUrl)) {
    return null;
  }
  
  if (isFirebaseStorageUrl(imageUrl)) {
    return await getFirebaseImageUrl(imageUrl);
  }
  
  // For other valid URLs, use directly
  return imageUrl;
};
