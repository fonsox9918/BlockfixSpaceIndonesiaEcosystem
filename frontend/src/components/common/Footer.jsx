import React from 'react';
import logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#342d3f] to-[#342d3f]">
      <div className="w-full px-6 py-12">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center text-[#ffffff]">
              <img 
                src={logo} 
                alt="Blockfix Logo" 
                className="h-10 mr-3"
              />
              <span className="text-2xl font-bold tracking-wide">BLOCKFIX</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Solusi interior profesional untuk bisnis dan properti premium di Indonesia. 
              Dengan pendekatan berbasis data dan eksekusi presisi, kami menghadirkan 
              ruang kerja yang meningkatkan produktivitas dan nilai properti Anda.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-[#1e293b] hover:bg-opacity-80 transition-all text-[#1877F2]">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#1e293b] hover:bg-opacity-80 transition-all text-[#E4405F]">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#1e293b] hover:bg-opacity-80 transition-all text-[#1DA1F2]">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#1e293b] hover:bg-opacity-80 transition-all text-[#0A66C2]">
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#ffffff] font-semibold mb-6 pb-2 border-b border-[#7C3AED] inline-block">
              Hubungi Tim Ahli Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-[#7C3AED] p-2 rounded-full mr-3">
                  <FaMapMarkerAlt className="text-[#ffffff] text-sm" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Kantor Pusat</p>
                  <p className="text-gray-400 text-xs">Gedung Perkantoran Gran Rubina, Jl. Sudirman Kav. 52-53, Jakarta 12190</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#7C3AED] p-2 rounded-full mr-3">
                  <FaPhoneAlt className="text-[#ffffff] text-sm" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Konsultasi Eksklusif</p>
                  <p className="text-gray-400 text-xs">021 2957 8100 (Weekdays 8AM-6PM)</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#7C3AED] p-2 rounded-full mr-3">
                  <FaEnvelope className="text-[#ffffff] text-sm" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Kerjasama Bisnis</p>
                  <p className="text-gray-400 text-xs">corporate@blockfix.co.id</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#ffffff] font-semibold mb-6 pb-2 border-b border-[#7C3AED] inline-block">
              Update Tren Interior
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Berlangganan newsletter kami untuk insight eksklusif:
            </p>
            <ul className="text-gray-300 text-xs mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-[#00F2FE] mr-2">•</span>
                Analisis ROI proyek interior komersial
              </li>
              <li className="flex items-start">
                <span className="text-[#00F2FE] mr-2">•</span>
                Strategi peningkatan nilai properti
              </li>
              <li className="flex items-start">
                <span className="text-[#00F2FE] mr-2">•</span>
                Studi kasus proyek enterprise
              </li>
            </ul>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Alamat email profesional Anda" 
                className="bg-[#1e293b] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F2FE] text-sm w-full placeholder-gray-400"
              />
<button 
  type="submit"
  className="w-full px-6 py-3 text-sm font-semibold rounded-xl shadow-md text-white bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] transition-opacity hover:opacity-90"
>
                Dapatkan Laporan Eksklusif
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto border-t border-[#1e293b] my-6"></div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6">
          <p className="text-gray-400 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} PT Blockfix Solusi Interior. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#00F2FE] transition-colors text-xs">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-400 hover:text-[#00F2FE] transition-colors text-xs">
              Syarat Layanan
            </a>
            <a href="#" className="text-gray-400 hover:text-[#00F2FE] transition-colors text-xs">
              Portofolio Klien
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;