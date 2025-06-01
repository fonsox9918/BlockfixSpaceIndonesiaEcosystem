// src/components/user/dashboard/DashboardOverview.jsx
import React from 'react';

const DashboardOverview = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Ringkasan Akun</h2>
      <p>Total Proyek Aktif: 2</p>
      <p>Status Pembayaran Terakhir: Selesai</p>
    </div>
  );
};

export default DashboardOverview;