import React from "react";

const EstimationDetailModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="float-right text-gray-600">Tutup</button>
        <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
        <p>Email: {data.email}</p>
        <p>No HP: {data.phone}</p>
        <p>Properti: {data.propertyType}</p>
        <p>Jadwal: {data.schedule}</p>
        <p>Catatan: {data.notes}</p>
        <p>Layanan: {data.services?.join(", ")}</p>

        {/* Area Pemasangan */}
        {data.areas?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Area Pemasangan:</h3>
            {data.areas.map((area, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <p className="text-sm">
                  <strong>Area:</strong>{" "}
                  {area.type === "Lainnya" ? area.customType : area.type}
                </p>

                {/* Tampilkan ukuran jika ada */}
                {area.sizes?.map((size, idx) => (
                  <p key={idx} className="text-sm text-gray-700 ml-2">
                    Ukuran ruangan {idx + 1}: {size} m²
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EstimationDetailModal;