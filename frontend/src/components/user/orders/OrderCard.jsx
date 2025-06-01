import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#121C3B] rounded-xl p-4 shadow-md text-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{order.title}</h3>
          <p className="text-sm text-gray-400">Status: {order.status}</p>
          <p className="text-sm text-gray-400">Tanggal: {order.date}</p>
        </div>
        <button
          onClick={() => navigate(`/order/${order.id}`)}
          className="px-4 py-2 text-sm bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] rounded-lg font-medium"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default OrderCard;