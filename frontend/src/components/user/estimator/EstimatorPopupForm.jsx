import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const EstimatorPopupForm = ({ name, phone, email, onClose }) => {
  const [services, setServices] = useState([]);
  const [areas, setAreas] = useState([
    { id: Date.now(), type: "", customType: "", count: 1, sizes: [""] },
  ]);
  const [propertyType, setPropertyType] = useState("");
  const [schedule, setSchedule] = useState("");
  const [notes, setNotes] = useState("");

  const handleServiceChange = (service) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleAreaChange = (index, field, value) => {
    const newAreas = [...areas];
    newAreas[index][field] = value;
    if (field === "count") {
      newAreas[index].sizes = Array.from({ length: parseInt(value) || 1 }, () => "");
    }
    setAreas(newAreas);
  };

  const handleSizeChange = (areaIndex, sizeIndex, value) => {
    const newAreas = [...areas];
    newAreas[areaIndex].sizes[sizeIndex] = value;
    setAreas(newAreas);
  };

  const handleAddArea = () => {
    setAreas((prev) => [
      ...prev,
      { id: Date.now(), type: "", customType: "", count: 1, sizes: [""] },
    ]);
  };

  const handleSubmit = async () => {
    const payload = {
      name,
      phone,
      email,
      services,
      areas: areas.map((area) => ({
        type: area.type,
        customType: area.customType,
        count: area.count,
        sizes: area.sizes,
      })),
      propertyType,
      schedule,
      notes,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "estimations"), payload);
      alert("Estimasi dikirim! Kami akan segera menghubungi Anda.");
      onClose();
    } catch (error) {
      console.error("Gagal mengirim estimasi:", error);
      alert("Terjadi kesalahan saat mengirim estimasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-white/10">
      <div className="w-full max-w-3xl p-6 rounded-xl overflow-y-auto max-h-[90vh] backdrop-blur-md bg-[#0a142fcc] border border-[#00F2FE] shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4">Form Estimasi Lanjutan</h2>

        {/* Jenis Layanan */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">Jenis Layanan:</label>
          <div className="flex gap-4 flex-wrap">
            {["Wall Panel WPC", "Plafon PVC", "Keduanya"].map((item) => (
              <label key={item} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={services.includes(item)}
                  onChange={() => handleServiceChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">Area yang Ingin Dikerjakan:</label>
          {areas.map((area, areaIndex) => (
            <div key={area.id} className="mb-4 border p-3 rounded-md bg-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                <select
                  className="border rounded p-2 text-black"
                  value={area.type}
                  onChange={(e) => handleAreaChange(areaIndex, "type", e.target.value)}
                >
                  <option value="">Pilih Area</option>
                  <option value="Kamar Tidur">Kamar Tidur</option>
                  <option value="Ruang Tamu">Ruang Tamu</option>
                  <option value="Dapur">Dapur</option>
                  <option value="Kamar Mandi">Kamar Mandi</option>
                  <option value="Balkon/Teras">Balkon/Teras</option>
                  <option value="Koridor/Lorong">Koridor/Lorong</option>
                  <option value="Void">Void</option>
                  <option value="Lainnya">Lainnya (Custom)</option>
                </select>

                {area.type === "Lainnya" && (
                  <input
                    type="text"
                    className="border rounded p-2 text-black"
                    placeholder="Tulis nama area"
                    value={area.customType}
                    onChange={(e) =>
                      handleAreaChange(areaIndex, "customType", e.target.value)
                    }
                  />
                )}

                <input
                  type="number"
                  min={1}
                  className="border rounded p-2 text-black"
                  placeholder="Jumlah Ruangan"
                  value={area.count}
                  onChange={(e) =>
                    handleAreaChange(areaIndex, "count", e.target.value)
                  }
                />
              </div>

              {area.sizes.map((size, i) => (
                <input
                  key={i}
                  type="number"
                  step="0.01"
                  className="w-full border mb-2 rounded p-2 text-black"
                  placeholder={`Ukuran m² Ruangan ${i + 1}`}
                  value={size}
                  onChange={(e) =>
                    handleSizeChange(areaIndex, i, e.target.value)
                  }
                />
              ))}
            </div>
          ))}

          <button
            onClick={handleAddArea}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Tambah Area
          </button>
        </div>

        {/* Tipe Properti */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">Tipe Properti:</label>
          <select
            className="w-full border rounded p-2 text-black"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Pilih Tipe Properti</option>
            <option>Rumah</option>
            <option>Apartemen</option>
            <option>Kantor</option>
            <option>Ruko</option>
            <option>Toko</option>
            <option>Lainnya</option>
          </select>
        </div>

        {/* Jadwal */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">Target Waktu Pengerjaan:</label>
          <select
            className="w-full border rounded p-2 text-black"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          >
            <option value="">Pilih Waktu</option>
            <option>Segera</option>
            <option>Dalam 1 Minggu</option>
            <option>Dalam 1 Bulan</option>
            <option>Fleksibel</option>
          </select>
        </div>

        {/* Catatan */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">Catatan Tambahan:</label>
          <textarea
            rows={3}
            className="w-full border rounded p-2 text-black"
            placeholder="Catatan tambahan..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Kirim Estimasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimatorPopupForm;