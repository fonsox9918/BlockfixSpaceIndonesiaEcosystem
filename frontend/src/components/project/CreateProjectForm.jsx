import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const CreateProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [images, setImages] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setClientId(user.uid);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload semua gambar ke storage
      const uploadedImageURLs = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `project-images/${uuidv4()}-${image.name}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );

      // Simpan ke Firestore
      await addDoc(collection(db, "projects"), {
        name,
        description,
        serviceType,
        images: uploadedImageURLs,
        clientId,
        createdAt: Timestamp.now(),
        status: "Menunggu Survey",
        progress: 0,
      });

      alert("Proyek berhasil dibuat!");
      setName("");
      setDescription("");
      setServiceType("");
      setImages([]);
    } catch (error) {
      console.error("Gagal membuat proyek:", error);
      alert("Terjadi kesalahan saat membuat proyek.");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Pesan Jasa / Buat Proyek</h2>
      
      <label className="block mb-2">Nama Proyek</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Deskripsi</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Jenis Jasa</label>
      <select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Pilih Layanan</option>
        <option value="wall-panel">Wall Panel</option>
        <option value="plafond">Plafond</option>
        <option value="smart-device">Smart Device</option>
        <option value="modular-device">Modular Device</option>
      </select>

      <label className="block mb-2">Upload Gambar Ruangan</label>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="mb-4"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-white py-2 rounded hover:opacity-90"
      >
        {isSubmitting ? "Mengirim..." : "Buat Proyek"}
      </button>
    </form>
  );
};

export default CreateProjectForm;