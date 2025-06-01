import React from "react";

const TimelineUpdates = ({ updates }) => {
  return (
    <div className="mt-4 space-y-4">
      {updates.map((item, idx) => (
        <div key={idx} className="border-l-4 border-blue-500 pl-4">
          <p className="text-white font-semibold">{item.title}</p>
          <p className="text-slate-400 text-sm">{item.date}</p>
          <p className="text-slate-300 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TimelineUpdates;