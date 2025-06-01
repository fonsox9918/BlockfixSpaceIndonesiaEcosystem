// src/components/user/dashboard/ProjectProgressCard.jsx
import React from 'react';

const ProjectProgressCard = ({ title, progress }) => {
  return (
    <div className="relative z-10 -mt-16 mb-4 mx-auto max-w-5xl bg-[#white] border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-6 backdrop-blur-md"/>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-gray-600">Progress: {progress}%</p>
    </div>
  );
};

export default ProjectProgressCard;