import React, { useState } from "react";
import { motion } from "framer-motion";
import EstimatorPopupForm from "./EstimatorPopupForm"; // pastikan path ini sesuai

const EstimatorWidget = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = () => {
    if (!name || !phone) {
      alert("Nama dan nomor HP wajib diisi.");
      return;
    }
    setIsPopupOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
className="relative z-10 -mt-16 mb-4 mx-auto max-w-5xl bg-[#white] border border-blue-500/30 shadow-lg shadow-blue-500/10 rounded-2xl p-6 backdrop-blur-md"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#white] mb-5">
          Hitung Estimasi Biayamu! <span className="text-blue-500 font-bold">FREE</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm text-[#white] mb-1">Nama</label>
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white text-black placeholder-gray-400 border border-[#2323FF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2323FF]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#white] mb-1">No. Telepon (Whatsapp)</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-white border border-[#2323FF] text-gray-500 rounded-l-lg">
                +62
              </span>
              <input
                type="tel"
                placeholder="812 XXXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white text-black placeholder-gray-400 border border-l-0 border-[#2323FF] rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2323FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#white] mb-1">Email (Opsional)</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-black placeholder-gray-400 border border-[#2323FF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2323FF]"
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
            >
              Tanya Harga
            </button>
          </div>
        </div>
      </motion.div>

      {isPopupOpen && (
        <EstimatorPopupForm
          name={name}
          phone={phone}
          email={email}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default EstimatorWidget;