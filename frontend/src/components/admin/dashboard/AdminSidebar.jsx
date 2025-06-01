import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Boxes,
  FileText,
  MessageCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Pengguna", icon: Users, path: "/admin/users" },
  { label: "Katalog", icon: Boxes, path: "/admin/catalog" },
  { label: "Pesanan", icon: FileText, path: "/admin/orders" },
  { label: "Pusat Pesan", icon: MessageCircle, path: "/admin/messages" }, // Tambahan menu Chat
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-[#0a142f] border-b border-gray-700 flex items-center justify-between shadow-sm text-white z-50">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-[#0a142f] text-white w-64 md:relative fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full md:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold mb-6 hidden md:block">Admin Panel</h2>
          <nav className="space-y-2">
            {navItems.map(({ label, icon: Icon, path }) => (
              <Link
                key={label}
                to={path}
                onClick={() => setIsOpen(false)} // auto close di mobile
                className={clsx(
                  "flex items-center px-4 py-3 rounded-xl transition",
                  {
                    "bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-md":
                      pathname === path,
                    "hover:bg-[#1a223f] text-white": pathname !== path,
                  }
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            ))}
          </nav>

          <button className="mt-6 flex items-center px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition w-full">
            <LogOut className="w-5 h-5 mr-3" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Backdrop Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;