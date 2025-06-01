import React from "react";

const EstimationCard = ({ data, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
      onClick={() => onClick(data)}
    >
      <p className="text-sm text-gray-600">
        {new Date(data.createdAt?.seconds * 1000).toLocaleString()}
      </p>
      <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>
      <p className="text-sm text-gray-700">{data.email}</p>
      <p className="text-sm text-gray-700">Telp: {data.phone}</p>
      <p className="text-sm text-gray-700">Tipe Properti: {data.propertyType}</p>
      <p className="text-sm text-gray-700">Jadwal: {data.schedule}</p>
    </div>
  );
};

export default EstimationCard;