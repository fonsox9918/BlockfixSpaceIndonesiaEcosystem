// src/pages/user/TransactionPage.jsx
import React from "react";
import TransactionSummary from "../../components/user/transactions/TransactionSummary";
import TransactionCard from "../../components/user/transactions/TransactionCard";

const dummyTransactions = [
  {
    id: "TX001",
    date: "02 Mei 2025",
    amount: 1500000,
    status: "Berhasil",
  },
  {
    id: "TX002",
    date: "03 Mei 2025",
    amount: 750000,
    status: "Pending",
  },
  {
    id: "TX003",
    date: "03 Mei 2025",
    amount: 500000,
    status: "Gagal",
  },
  {
    id: "TX004",
    date: "04 Mei 2025",
    amount: 1250000,
    status: "Berhasil",
  },
];

const TransactionPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Transaksi Anda</h1>
      <TransactionSummary transactions={dummyTransactions} />
      <div className="space-y-4">
        {dummyTransactions.map((tx) => (
          <TransactionCard key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;