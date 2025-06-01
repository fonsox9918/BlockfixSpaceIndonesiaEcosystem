// src/components/project/ImageUploader.js
import React, { useState } from "react";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const ImageUploader = ({ onUploadComplete }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const urls = [];

    for (const file of images) {
      const fileRef = ref(storage, `project_images/${uuidv4()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      urls.push(downloadURL);
    }

    setUploading(false);
    onUploadComplete(urls);
  };

  return (
    <div className="space-y-2">
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading || images.length === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "Mengunggah..." : "Upload Gambar"}
      </button>
    </div>
  );
};

export default ImageUploader;