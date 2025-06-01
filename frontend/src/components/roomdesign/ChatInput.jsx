import React, { useState, useRef } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const handleSend = () => {
    if (!text.trim() && !selectedImage) return;

    onSend({
      text,
      image: selectedImage,
      sender: "user",
    });

    setText("");
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {selectedImage && (
        <div className="flex justify-between items-center bg-gray-200 p-2 rounded">
          <img
            src={selectedImage}
            alt="selected"
            className="h-16 rounded object-cover"
          />
          <button
            className="text-red-600 font-bold"
            onClick={() => {
              setSelectedImage(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            ×
          </button>
        </div>
      )}
      <textarea
        rows={2}
        className="w-full p-2 border rounded resize-none"
        placeholder="Jelaskan warna/motif yang mau digunakan..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <label className="cursor-pointer text-blue-600 hover:underline">
          + Upload Gambar
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSend}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
