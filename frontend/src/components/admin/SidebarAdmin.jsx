// src/components/admin/SidebarAdmin.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/estimations", label: "Estimations" },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-64 bg-[#0a142f] text-white min-h-screen flex flex-col justify-between p-4">
      <div>
        <h1 className="text-white font-bold mb-6">Blockfix Admin</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-blue-500 text-white no-underline" : "hover:bg-blue-700 text-white no-underline"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 py-2 px-4 rounded bg-red-600 hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default SidebarAdmin;