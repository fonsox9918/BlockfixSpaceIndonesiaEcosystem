// src/components/admin/dashboard/SystemActivityFeed.jsx
import React from "react";

const SystemActivityFeed = ({ activities = [] }) => {
  return (
    <div className="bg-[#1a233a] text-white rounded-2xl p-6 shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Aktivitas Sistem</h3>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <p className="text-gray-400">Belum ada aktivitas terbaru.</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="text-sm border-l-4 border-blue-500 pl-4">
              <p className="text-gray-100">{activity.message}</p>
              <span className="text-xs text-gray-400">{activity.timestamp}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SystemActivityFeed;