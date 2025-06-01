// src/components/user/dashboard/UpcomingSchedule.jsx
import React from 'react';

const UpcomingSchedule = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Jadwal Terdekat</h2>
      <ul className="list-disc list-inside text-sm">
        <li>Survey Lapangan - 5 Mei 2025, 10:00</li>
        <li>Pemasangan Plafon - 8 Mei 2025, 09:00</li>
      </ul>
    </div>
  );
};

export default UpcomingSchedule;
