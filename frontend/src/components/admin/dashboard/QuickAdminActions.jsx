import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users, FileText, PackageSearch } from "lucide-react";

const QuickAdminActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Plus className="w-5 h-5 mb-1" />,
      label: "Tambah Produk",
      action: () => navigate("/admin/catalog/create"),
    },
    {
      icon: <Users className="w-5 h-5 mb-1" />,
      label: "Kelola Pengguna",
      action: () => navigate("/admin/users"),
    },
    {
      icon: <FileText className="w-5 h-5 mb-1" />,
      label: "Monitor Order",
      action: () => navigate("/admin/orders"),
    },
    {
      icon: <PackageSearch className="w-5 h-5 mb-1" />,
      label: "Cek Katalog",
      action: () => navigate("/admin/catalog"),
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="flex flex-col items-center justify-center rounded-2xl text-white text-xs sm:text-sm md:text-base py-4 sm:py-6 px-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md"
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickAdminActions;