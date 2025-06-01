import React from "react";
import TransactionCard from "./TransactionCard";

const dummyTransactions = [
  {
    id: "TX123456",
    date: "02 Mei 2025",
    amount: 3500000,
    status: "Berhasil",
  },
  {
    id: "TX123455",
    date: "28 April 2025",
    amount: 2000000,
    status: "Pending",
  },
  {
    id: "TX123454",
    date: "15 April 2025",
    amount: 1000000,
    status: "Gagal",
  },
];

const TransactionList = () => {
  return (
    <div className="space-y-4 mt-6">
      {dummyTransactions.map((tx) => (
        <TransactionCard key={tx.id} transaction={tx} />
      ))}
    </div>
  );
};

export default TransactionList;