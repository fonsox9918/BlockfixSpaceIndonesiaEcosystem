import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const uploadProductImage = (file, productId, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file || !productId) return reject("File atau Product ID tidak valid");

    const storageRef = ref(storage, `products/${productId}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(progress);
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(resolve)
          .catch(reject);
      }
    );
  });
};
