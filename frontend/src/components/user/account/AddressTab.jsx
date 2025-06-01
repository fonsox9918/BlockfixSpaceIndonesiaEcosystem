import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import AddressModal from "@/components/user/account/AddressModal";

const AddressTab = ({ user, userData }) => {
  const address = userData?.address || null;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        address: null,
      });
    } catch (error) {
      console.error("Gagal menghapus alamat:", error);
    }
  };

  const handleSetPrimary = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        address: {
          ...address,
          isPrimary: true,
        },
      });
    } catch (error) {
      console.error("Gagal set primary:", error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Alamat Pengiriman</h1>

      <button
        onClick={() => setShowModal(true)}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        + Tambah Alamat Baru
      </button>

      {address ? (
        <div className="border rounded-lg p-4 mt-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{address.label}</h3>
              <p className="font-medium">{address.recipient}</p>
              <p className="text-gray-600">{address.phone}</p>
            </div>
            {address.isPrimary && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Utama
              </span>
            )}
          </div>

          <p className="mt-3 text-gray-700">
            {address.street}, {address.kelurahan}, {address.kecamatan},{" "}
            {address.city}, {address.province} {address.postalCode}
          </p>

          <div className="flex justify-between mt-4 pt-3 border-t">
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ubah Alamat
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Share
              </button>
            </div>
            <div className="flex space-x-3">
              {!address.isPrimary && (
                <button
                  onClick={handleSetPrimary}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Jadikan Utama
                </button>
              )}
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Belum ada alamat disimpan.</p>
      )}

      {showModal && (
        <AddressModal
          user={user}
          initialData={address}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AddressTab;