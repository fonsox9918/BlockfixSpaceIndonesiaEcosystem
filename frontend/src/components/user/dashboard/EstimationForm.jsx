import React from 'react';

const EstimationForm = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold uppercase">SEIKA</h1>
        <p className="text-xs text-gray-500 mb-1">PREMIUM CUSTOM FURNITURE</p>
        <p className="text-sm italic text-gray-700">Elevate Your Elegant Living</p>
      </div>

      <div className="border-t border-gray-200 my-3"></div>

      {/* Form Section */}
      <h2 className="text-md font-semibold mb-3">Hitung Biayamu!</h2>
      
      <div className="space-y-3">
        {/* Nama Input */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nama</label>
          <input
            type="text"
            placeholder="M dendy alfasa abung"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        
        {/* Nomor Telepon */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">No. Telepon (Terdaftar di Whatsapp)</label>
          <div className="flex">
            <select className="w-20 px-2 py-2 border border-gray-300 rounded-l-md text-sm bg-white">
              <option>+62</option>
            </select>
            <input
              type="tel"
              placeholder="812 XXX XXX"
              className="flex-1 px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-md text-sm"
            />
          </div>
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email (Optional)</label>
          <input
            type="email"
            placeholder="jyfonso@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        
        {/* Tombol Submit */}
        <button className="w-full bg-black text-white py-2 rounded-md text-sm font-medium mt-2 hover:bg-gray-800 transition">
          Tanya Harga
        </button>
      </div>

      <div className="border-t border-gray-200 my-3"></div>

      {/* Footer */}
      <div className="text-center mt-3">
        <h3 className="text-sm font-medium">Desain Interior Sesuai Kebutuhanmu</h3>
        <p className="text-xs text-gray-500 mt-1">Ragam Desain Interior untuk Setiap Kebutuhan Gaya hidup</p>
      </div>
    </div>
  );
};

export default EstimationForm;