// ImageUploader.jsx
import { useState } from "react";
import { uploadFile } from "@/services/uploadService";

export default function ImageUploader({ onChange, userId, pathType = "product_photos", multiple = true }) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    const urls = [];

    for (const file of files) {
      try {
        const downloadURL = await uploadFile(file, userId, (prog) => setProgress(prog));
        urls.push(downloadURL);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUploading(false);
    setProgress(0);
    setPreviewUrls(urls);
    if (onChange) onChange(urls);
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} multiple={multiple} />
      {uploading && <p>Uploading... {progress}%</p>}
      <div className="flex gap-2 flex-wrap">
        {previewUrls.map((url, i) => (
          <img key={i} src={url} alt="Uploaded" className="w-20 h-20 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}