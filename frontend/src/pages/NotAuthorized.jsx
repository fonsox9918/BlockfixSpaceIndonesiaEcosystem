// src/pages/NotAuthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a142f] text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Akses Ditolak</h1>
      <p className="text-lg mb-6">Kamu tidak memiliki izin untuk mengakses halaman ini.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] rounded-xl font-semibold"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotAuthorized;