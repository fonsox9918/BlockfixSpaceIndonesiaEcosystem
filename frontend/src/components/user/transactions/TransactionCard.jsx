// src/components/user/transactions/TransactionCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "Berhasil":
      return "text-green-400";
    case "Pending":
      return "text-yellow-400";
    case "Gagal":
      return "text-red-400";
    default:
      return "text-white";
  }
};

const TransactionCard = ({ transaction }) => {
  return (
    <div className="bg-[#1e293b] p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-semibold">#{transaction.id}</h3>
        <p className="text-sm text-slate-400">{transaction.date}</p>
        <p className={`text-sm mt-1 ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">Rp {transaction.amount.toLocaleString()}</p>
        <Link
          to={`/payment/${transaction.id}`}
          className="text-sm text-sky-400 hover:underline mt-1 inline-block"
        >
          {transaction.status === "Pending" ? "Bayar Sekarang" : "Lihat Detail"}
        </Link>
      </div>
    </div>
  );
};

export default TransactionCard;