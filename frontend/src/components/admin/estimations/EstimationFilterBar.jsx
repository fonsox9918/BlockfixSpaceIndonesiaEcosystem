import React from "react";

const EstimationFilterBar = ({ filter, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Cari nama atau email..."
        className="w-full p-2 rounded border border-gray-300"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default EstimationFilterBar;