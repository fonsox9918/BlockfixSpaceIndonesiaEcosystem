import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductFormModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [stock, setStock] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setDescription(editData.description || "");
      setPrice(editData.price || "");
      setCategory(editData.category || "");
      setSubcategory(editData.subcategory || "");
      setStock(editData.stock || "");
      // Note: Tidak mengisi thumbnail & gallery karena file input tidak bisa di-set langsung
      setThumbnail(null);
      setGallery([]);
    } else {
      // Reset semua field kalau tambah produk baru
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSubcategory("");
      setStock("");
      setThumbnail(null);
      setGallery([]);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("stock", stock);

    if (thumbnail) formData.append("thumbnail", thumbnail);
    gallery.forEach((file) => formData.append("gallery", file));

    try {
      const res = editData
        ? await axios.put(`/api/products/${editData.id}`, formData)
        : await axios.post("/api/products", formData);

      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk. Cek konsol untuk detail error.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4">
          {editData ? "Edit Produk" : "Tambah Produk"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium">Nama Produk</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Deskripsi</label>
            <textarea
              className="w-full border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Harga (contoh: 150000)</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Kategori</label>
            <select
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Plafond PVC">Plafond PVC</option>
              <option value="WPC">WPC</option>
              <option value="Smart Device">Smart Device</option>
              <option value="Furniture">Furniture</option>
              <option value="Aksesoris">Aksesoris</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Subkategori</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Stok</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded p-2"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Galeri Gambar</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full border rounded p-2"
              onChange={(e) => setGallery(Array.from(e.target.files))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;