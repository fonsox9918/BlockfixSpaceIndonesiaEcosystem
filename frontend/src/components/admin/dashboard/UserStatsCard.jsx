// src/components/admin/dashboard/UserStatsCard.jsx
import React from "react";
import { Users, Hammer, SearchCheck } from "lucide-react";

const UserStatsCard = ({ stats }) => {
  return (
    <div className="bg-[#1a233a] text-white rounded-2xl p-6 shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Statistik Pengguna</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 bg-[#2a3250] p-4 rounded-xl">
          <Users className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-300">Klien</p>
            <p className="text-xl font-bold">{stats?.client || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-[#2a3250] p-4 rounded-xl">
          <Hammer className="w-6 h-6 text-orange-400" />
          <div>
            <p className="text-sm text-gray-300">Tukang</p>
            <p className="text-xl font-bold">{stats?.worker || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-[#2a3250] p-4 rounded-xl">
          <SearchCheck className="w-6 h-6 text-purple-400" />
          <div>
            <p className="text-sm text-gray-300">Surveyor</p>
            <p className="text-xl font-bold">{stats?.surveyor || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;