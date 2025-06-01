import React, { useState } from "react";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const UploadRoomPhotosStep = ({ onImagesUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const uploadedUrls = [];

    for (const file of selectedFiles) {
      const fileRef = ref(storage, `project-photos/${uuidv4()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      uploadedUrls.push(downloadURL);
    }

    setUploading(false);
    onImagesUploaded(uploadedUrls); // callback untuk simpan ke Firestore
  };

  return (
    <div className="space-y-4">
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? "Mengunggah..." : "Upload Foto"}
      </button>
    </div>
  );
};

export default UploadRoomPhotosStep;