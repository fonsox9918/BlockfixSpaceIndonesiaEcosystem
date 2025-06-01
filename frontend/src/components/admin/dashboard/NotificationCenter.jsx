// src/components/admin/dashboard/NotificationCenter.jsx
import React from "react";
import { BellIcon } from "lucide-react";

const NotificationCenter = ({ notifications = [] }) => {
  return (
    <div className="bg-[#1a233a] text-white rounded-2xl p-6 shadow-md mt-4">
      <div className="flex items-center mb-4">
        <BellIcon className="text-blue-400 mr-2" size={20} />
        <h3 className="text-lg font-semibold">Pusat Notifikasi</h3>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {notifications.length === 0 ? (
          <p className="text-gray-400">Tidak ada notifikasi baru.</p>
        ) : (
          notifications.map((notif, index) => (
            <div
              key={index}
              className="bg-[#24304b] p-3 rounded-lg hover:bg-[#2e3a56] transition duration-200"
            >
              <p className="text-sm">{notif.message}</p>
              <span className="text-xs text-gray-400">{notif.timestamp}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;