import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import ServiceFormModal from "./ServiceFormModal";
import ServiceTable from "./ServiceTable";

const AdminServicePage = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setServices(data);
    });
    return unsubscribe;
  }, []);

  const handleEdit = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleDelete = async (service) => {
    if (confirm(`Yakin ingin menghapus "${service.name}"?`)) {
      await deleteDoc(doc(db, "services", service.id));
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Manajemen Layanan</h1>
        <button
          className="bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] px-4 py-2 rounded font-medium"
          onClick={() => {
            setEditingService(null);
            setModalOpen(true);
          }}
        >
          + Tambah Layanan
        </button>
      </div>

      <ServiceTable services={services} onEdit={handleEdit} onDelete={handleDelete} />

      {modalOpen && (
        <ServiceFormModal
          service={editingService}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminServicePage;