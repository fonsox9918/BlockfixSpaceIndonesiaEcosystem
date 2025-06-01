// src/components/UploadPreview.jsx
import React from "react";

const UploadPreview = ({ image, onRemove }) => {
  if (!image) return null;

  return (
    <div className="flex items-center bg-gray-200 p-2 rounded mb-2">
      <img
        src={image}
        alt="Preview"
        className="h-16 w-24 object-cover rounded"
      />
      <button
        onClick={onRemove}
        className="ml-4 text-red-600 font-bold text-xl leading-none"
        aria-label="Hapus gambar"
      >
        ×
      </button>
    </div>
  );
};

export default UploadPreview;
