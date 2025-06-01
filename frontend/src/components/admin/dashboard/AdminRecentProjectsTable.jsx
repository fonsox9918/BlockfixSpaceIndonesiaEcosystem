import React from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dummyProjects = [
  {
    id: "PRJ-20250506-001",
    clientName: "Denny Santoso",
    status: "Menunggu Survey",
    createdAt: "2025-05-06",
  },
  {
    id: "PRJ-20250505-002",
    clientName: "Sinta Ayu",
    status: "Survey Selesai",
    createdAt: "2025-05-05",
  },
  {
    id: "PRJ-20250504-003",
    clientName: "Rudi Hartono",
    status: "Menunggu Pembayaran",
    createdAt: "2025-05-04",
  },
];

const statusColor = {
  "Menunggu Survey": "bg-yellow-500",
  "Survey Selesai": "bg-blue-500",
  "Menunggu Pembayaran": "bg-red-500",
};

const AdminRecentProjectsTable = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Proyek Terbaru</h3>
      </div>
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-left text-xs uppercase font-bold text-gray-500">
          <tr>
            <th className="px-6 py-3">ID Proyek</th>
            <th className="px-6 py-3">Klien</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Tanggal</th>
            <th className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dummyProjects.map((project) => (
            <tr key={project.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">{project.id}</td>
              <td className="px-6 py-4">{project.clientName}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-white text-xs ${statusColor[project.status] || "bg-gray-400"}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4">{project.createdAt}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => navigate(`/admin/projects/${project.id}`)}
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <Eye className="w-4 h-4 mr-1" /> Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRecentProjectsTable;