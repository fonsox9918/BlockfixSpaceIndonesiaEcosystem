import React from "react";

const ProjectHeader = ({ project }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl text-white shadow">
      <h2 className="text-xl font-bold">{project.name}</h2>
      <p className="text-sm text-slate-300">{project.location}</p>
      <div className="mt-2 flex justify-between text-sm">
        <span>Mulai: {project.startDate}</span>
        <span>Status: <span className="font-semibold">{project.status}</span></span>
      </div>
    </div>
  );
};

export default ProjectHeader;