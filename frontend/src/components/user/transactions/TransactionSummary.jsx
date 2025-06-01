import React from "react";

const TransactionSummary = ({ transactions }) => {
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalSuccess = transactions.filter((tx) => tx.status === "Berhasil").length;
  const totalPending = transactions.filter((tx) => tx.status === "Pending").length;
  const totalFailed = transactions.filter((tx) => tx.status === "Gagal").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white mb-6">
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-md">
        <h4 className="text-sm text-slate-400">Total Transaksi</h4>
        <p className="text-xl font-semibold">Rp {totalAmount.toLocaleString()}</p>
      </div>
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-md">
        <h4 className="text-sm text-slate-400">Berhasil</h4>
        <p className="text-xl font-semibold text-green-400">{totalSuccess}</p>
      </div>
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-md">
        <h4 className="text-sm text-slate-400">Pending / Gagal</h4>
        <p className="text-xl font-semibold">
          <span className="text-yellow-400">{totalPending}</span> / <span className="text-red-400">{totalFailed}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionSummary;