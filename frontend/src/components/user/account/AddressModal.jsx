import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const AddressModal = ({ user, initialData, onClose }) => {
  const [form, setForm] = useState({
    label: "",
    recipient: "",
    phone: "",
    street: "",
    kelurahan: "",
    kecamatan: "",
    city: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        address: { ...form, isPrimary: true },
      });
      onClose();
    } catch (err) {
      console.error("Gagal simpan alamat:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Ubah Alamat" : "Tambah Alamat"}
        </h2>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          {[
            ["label", "Label Alamat (misal: Rumah, Kantor)"],
            ["recipient", "Nama Penerima"],
            ["phone", "Nomor HP"],
            ["street", "Alamat Lengkap"],
            ["kelurahan", "Kelurahan"],
            ["kecamatan", "Kecamatan"],
            ["city", "Kota/Kabupaten"],
            ["province", "Provinsi"],
            ["postalCode", "Kode Pos"],
          ].map(([key, label]) => (
            <input
              key={key}
              name={key}
              placeholder={label}
              value={form[key]}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Simpan Alamat
        </button>
      </div>
    </div>
  );
};

export default AddressModal;