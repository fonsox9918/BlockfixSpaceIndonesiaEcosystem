import React from 'react';
import { motion } from 'framer-motion';
import tukang3D from '../assets/tukang-3d.png';
import mockupDesain from '../assets/mockup-ruangan.png';
import './Hero3D.css';

function Hero3D() {
  return (
    <section
      className="hero-3d px-4 py-5"
      style={{ backgroundColor: '#0a142f', color: 'white' }}
    >
      <div className="container-fluid d-flex flex-column flex-lg-row align-items-center justify-content-between">
        
        {/* Kiri: Teks dan Karakter AI */}
        <motion.div
          className="text-lg-start text-center mb-5 mb-lg-0 col-lg-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="floating-box mb-3 p-3 rounded bg-dark bg-opacity-50">
            <p className="mb-0">
              <strong>AI Prompt:</strong> “Foto ruang tamu minimalis dengan dinding putih dan plafon WPC – tampilkan desain + estimasi pemasangan”
            </p>
          </div>

          <motion.img
            src={tukang3D}
            alt="Karakter Tukang AI"
            className="karakter-3d mb-4 img-fluid"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{ maxWidth: 250 }}
          />

          <h1 className="fw-bold mb-3">
            Buat Desain & Panduan Pemasangan Otomatis dari Foto
          </h1>
          <p className="lead mb-4">
            Cukup upload foto ruangan Anda. Teknologi AI BlockFix akan membaca bentuk ruangan, mengenali permukaan dinding dan plafon, lalu menyarankan desain dan panduan pemasangan khusus untuk tukang.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-primary btn-lg"
          >
            Coba Sekarang
          </motion.button>
        </motion.div>

        {/* Kanan: Mockup Desain */}
        <motion.div
          className="text-center col-lg-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.img
            src={mockupDesain}
            alt="Mockup Desain AI"
            className="mockup-desain img-fluid"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero3D;
