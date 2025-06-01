import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white text-center p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Halaman tidak ditemukan.</p>
      <Link to="/" className="text-sky-400 underline hover:text-sky-600">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;