import React from "react";
import { useNavigate } from "react-router-dom";

const ActiveProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#121C3B] rounded-2xl p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm text-gray-400">Status: {project.status}</p>
        <p className="text-sm text-gray-400">Progress: {project.progress}%</p>
      </div>
      <button
        onClick={() => navigate(`/project/${project.id}`)}
        className="mt-3 md:mt-0 px-4 py-2 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-white rounded-lg text-sm font-medium"
      >
        Lihat Detail
      </button>
    </div>
  );
};

export default ActiveProjectCard;