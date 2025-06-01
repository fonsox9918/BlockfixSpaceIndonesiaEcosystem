import React from "react";

const sampleTransactions = [
  {
    id: "TXN123456",
    type: "Pembayaran DP",
    amount: 1500000,
    status: "Berhasil",
    date: "01 Mei 2025",
  },
  {
    id: "TXN123457",
    type: "Pembayaran Pelunasan",
    amount: 3500000,
    status: "Menunggu",
    date: "03 Mei 2025",
  },
];

const RecentTransactionCard = () => {
  return (
    <div className="mt-6 bg-[#121C3B] p-4 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-semibold mb-3">Transaksi Terakhir</h2>
      <ul className="space-y-3">
        {sampleTransactions.map((tx) => (
          <li
            key={tx.id}
            className="flex items-center justify-between border-b border-white/10 pb-2"
          >
            <div>
              <p className="text-sm font-medium">{tx.type}</p>
              <p className="text-xs text-white/60">{tx.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Rp {tx.amount.toLocaleString()}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  tx.status === "Berhasil"
                    ? "bg-green-500/30 text-green-300"
                    : "bg-yellow-500/30 text-yellow-300"
                }`}
              >
                {tx.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactionCard;