import React from "react";
import { Briefcase, CheckCircle, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Proyek",
    value: 128,
    icon: <Briefcase className="w-6 h-6 text-white" />,
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  {
    title: "Aktif",
    value: 42,
    icon: <Clock className="w-6 h-6 text-white" />,
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    title: "Selesai",
    value: 86,
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
];

const AdminStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div key={index} className={`rounded-2xl p-5 shadow-md text-white ${item.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">{item.title}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;