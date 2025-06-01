import React from "react";
import { Bell, Search } from "lucide-react";

const AdminHeaderTopbar = () => {
  return (
    <header className="w-full bg-[#0a142f] text-white px-4 md:px-6 py-4 border-b border-gray-800 flex items-center justify-between">
      <div className="text-xl font-bold">Dashboard Admin</div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            className="bg-[#1a223f] text-white placeholder-gray-400 px-4 py-2 rounded-xl w-48 focus:outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
        </div>

        <button className="relative p-2 rounded-full bg-[#1a223f] hover:bg-[#2a3250] transition">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#0a142f]" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://ui-avatars.com/api/?name=Admin"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:inline text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeaderTopbar;