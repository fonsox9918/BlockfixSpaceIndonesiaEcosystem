// src/components/admin/AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-[#0f172a] to-[#1e293b] text-white">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-[#f1f5f9] text-black">
        <div className="bg-white rounded-xl shadow-xl p-6 min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;