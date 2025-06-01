import React, { useState } from "react";

const RoomDesign = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [style, setStyle] = useState("Scandinavian");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Silakan upload foto ruangan terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("style", style);

    // Kirim ke backend nanti
    console.log("Form data siap dikirim ke AI backend:", { image, style });
    alert("Simulasi kirim ke backend berhasil. (Belum terhubung)");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Desain Ulang Ruanganmu</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Upload Foto Ruangan</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <p className="text-sm mb-2">Preview:</p>
            <img src={preview} alt="Preview" className="rounded-lg shadow-md max-h-60 mx-auto" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Pilih Gaya Desain</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Scandinavian">Scandinavian</option>
            <option value="Industrial">Industrial</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Modern">Modern</option>
            <option value="Japanese Zen">Japanese Zen</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Kirim ke AI
        </button>
      </form>
    </div>
  );
};

export default RoomDesign;

