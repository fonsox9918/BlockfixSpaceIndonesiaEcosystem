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
    <div className="mt-6 lg:mt-8 bg-white border border-gray-200 p-6 lg:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Transaksi Terakhir</h2>
        <button className="text-[#7C3AED] hover:text-[#6D28D9] font-medium text-sm">
          Lihat Semua
        </button>
      </div>
      
      {sampleTransactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500">Belum ada transaksi</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sampleTransactions.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{tx.type}</p>
                <p className="text-sm text-gray-600">ID: {tx.id}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900 mb-2">
                  Rp {tx.amount.toLocaleString('id-ID')}
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    tx.status === "Berhasil"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {tx.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactionCard;