// src/components/user/dashboard/PaymentStatus.jsx
import React from 'react';

const PaymentStatus = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Status Pembayaran</h2>
      <ul className="text-sm">
        <li>Tahap 1 - Lunas</li>
        <li>Tahap 2 - Menunggu Approve</li>
      </ul>
    </div>
  );
};

export default PaymentStatus;