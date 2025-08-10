import React from "react";
import { Link } from "react-router-dom";

const NotFoundImg = "/images/404icon.svg"; // gunakan path relatif dari public/

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6 text-gray-800">
      <img
        src={NotFoundImg}
        alt="Blockfix Bot 404"
        className="w-64 max-w-full mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-lg mb-6">
        Halaman atau fitur ini masih dalam proses pengembangan oleh tim Blockfix.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/Dashboard"
          className="px-6 py-3 bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
        >
          Kembali ke Beranda
        </Link>
        <a
          href="https://wa.me/6281328998587?text=Halo%20Blockfix%2C%20saya%20mau%20konsultasi%20tentang%20layanan."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default NotFound;
