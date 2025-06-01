import React from "react";

const OrderCard = ({ project }) => {
  if (!project) return null;

  const {
    projectId,
    projectName,
    status,
    createdAt,
    progress = 0,
  } = project;

  const statusColor = {
    selesai: "bg-green-600",
    proses: "bg-yellow-600",
    survei: "bg-indigo-600",
    menunggu: "bg-gray-600",
  };

  return (
    <div className="bg-[#0a142f] border border-[#1f2b4a] rounded-2xl p-4 mb-4 text-white shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{projectName || "Nama Proyek"}</h2>
          <p className="text-sm text-gray-400">ID: {projectId}</p>
          <p className="text-sm text-gray-400">
            Tanggal: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColor[status] || "bg-gray-500"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #00F2FE, #4FACFE)",
            }}
          />
        </div>
        <p className="text-right text-xs text-gray-400 mt-1">{progress}% progres</p>
      </div>
    </div>
  );
};

export default OrderCard;