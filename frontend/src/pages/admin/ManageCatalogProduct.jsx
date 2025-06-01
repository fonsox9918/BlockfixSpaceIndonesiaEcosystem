import React, { useState } from "react";
import ProductTable from "@/components/admin/catalog/product/ProductTable";
import ProductFormModal from "@/components/admin/catalog/product/ProductFormModal";

const ManageCatalogProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false); // Untuk refresh data tabel

  const handleSuccess = () => {
    setRefresh(!refresh); // Trigger ulang data
    setOpenModal(false);  // Tutup modal setelah submit
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Manajemen Produk</h1>
          <p className="text-gray-600">Di sini kamu bisa melihat dan mengatur produk katalog.</p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Produk
        </button>
      </div>

      <ProductTable refresh={refresh} />

      <ProductFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ManageCatalogProduct;