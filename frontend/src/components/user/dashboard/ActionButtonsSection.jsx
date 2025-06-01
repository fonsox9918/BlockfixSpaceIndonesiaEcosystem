import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUpload, FaMagic, FaCalendarAlt } from "react-icons/fa";
import CreateProjectForm from "../../project/CreateProjectForm";

const actions = [
  { label: "Pesan Jasa", action: "/catalog", icon: <FaPlus size={16} /> },
  { label: "Upload Foto", action: "/upload-room", icon: <FaUpload size={16} /> },
  { label: "Desain AI", action: "/room-design", icon: <FaMagic size={16} /> },
  { label: "Jadwalkan Survey", action: "/survey", icon: <FaCalendarAlt size={16} /> },
];
const ActionButtonsSection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (btn) => {
    if (btn.type === "modal") {
      setShowModal(true);
    } else {
      navigate(btn.action);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
          {actions.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleClick(btn)}
              className="flex items-center justify-center gap-2 px-4 py-2 h-12 text-sm font-medium bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-white rounded-xl shadow-md transition hover:opacity-90"
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-lg relative">
            <h2 className="text-lg font-semibold mb-4">Form Pemesanan Jasa</h2>
            <CreateProjectForm />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtonsSection;