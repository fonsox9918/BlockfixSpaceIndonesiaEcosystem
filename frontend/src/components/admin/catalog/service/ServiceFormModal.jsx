import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { uploadFile } from "@/utils/uploadFile"; // Fungsi upload gambar
import { Plus } from "lucide-react";

const ServiceFormModal = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    thumbnail: "",
    gallery: [],
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [previewGallery, setPreviewGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);
      setPreviewThumbnail(service.thumbnail);
      setPreviewGallery(service.gallery || []);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setPreviewThumbnail(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    setPreviewGallery(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id =
      service?.id ||
      `SRV-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`;

    const ref = doc(db, "services", id);

    try {
      let thumbnailURL = formData.thumbnail;
      if (thumbnailFile) {
        thumbnailURL = await uploadFile(thumbnailFile, `services/${id}/thumbnail`);
      }

      let galleryURLs = formData.gallery;
      if (galleryFiles.length > 0) {
        galleryURLs = await Promise.all(
          galleryFiles.map((file, i) =>
            uploadFile(file, `services/${id}/gallery/${file.name}-${i}`)
          )
        );
      }

      const payload = {
        ...formData,
        thumbnail: thumbnailURL,
        gallery: galleryURLs,
        updatedAt: serverTimestamp(),
      };

      if (!service) {
        payload.createdAt = serverTimestamp();
        payload.serviceId = id;
      }

      if (service) {
        await updateDoc(ref, payload);
      } else {
        await setDoc(ref, payload);
      }

      onClose();
    } catch (error) {
      console.error("Gagal menyimpan layanan:", error);
      alert("Terjadi kesalahan saat menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-black">
          {service ? "Edit" : "Tambah"} Layanan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="text"
            name="name"
            placeholder="Nama Layanan"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Deskripsi"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Upload Thumbnail */}
          <div>
            <label className="block font-medium mb-1">Thumbnail</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer w-32 h-32 border border-dashed border-gray-400 flex items-center justify-center rounded hover:bg-gray-100">
                <Plus className="text-gray-500" />
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
              </label>
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="Thumbnail Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          {/* Upload Gallery */}
          <div>
            <label className="block font-medium mb-1">Gallery</label>
            <div className="flex gap-2 flex-wrap">
              <label className="cursor-pointer w-24 h-24 border border-dashed border-gray-400 flex items-center justify-center rounded hover:bg-gray-100">
                <Plus className="text-gray-500" />
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
              </label>
              {previewGallery.map((url, i) => (
                <img key={i} src={url} alt={`Gallery ${i}`} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-medium px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormModal;