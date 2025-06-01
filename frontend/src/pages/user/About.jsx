import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ParticlesBackground from '@/components/common/ParticlesBackground';
import VisionImage from '@/assets/images/Vision.png';
import MissionImage from '@/assets/images/Mission.png';
import ProductImage from '@/assets/images/Product.png';
import SmartImage from '@/assets/images/ProductSmart.png';
import BlockchainImage from '@/assets/images/Blockchain.png';
import ImpactImage from '@/assets/images/NFT.png';
import FurnishImage from '@/assets/images/Furnish.png';
import TechnologyImage from '@/assets/images/Technology.png';
import Footer from '../../components/common/Footer';
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Tentang Kami - BlockFix Interior</title>
  <meta name="description" content="BlockFix menggabungkan AI, blockchain, dan material ramah lingkungan untuk interior masa depan." />
</Helmet>

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans relative overflow-x-hidden p-0">
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-t-4 border-[#7C3AED]">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
            data-aos="fade-down"
          >
            Membangun Masa Depan Interior
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#7C3AED] to-cyan-400 text-transparent bg-clip-text">
              Dengan Teknologi & Inovasi
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
          >
            BlockFix adalah platform <span className="text-[#7C3AED] font-semibold">AI interior pertama di Indonesia</span> yang menggabungkan
            <span className="text-cyan-500 font-medium"> desain otomatis, blockchain, dan smart living</span> untuk menciptakan ruang yang
            personal, cerdas, dan berkelanjutan.
          </p>
        </div>
      </section>



{/* Visi Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div className="order-1" data-aos="fade-right">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400">
        Visi Kami
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        <strong className="text-[#7C3AED]">Memimpin transformasi digital industri interior</strong> dengan solusi yang mengintegrasikan 
        kecanggihan teknologi dan keberlanjutan lingkungan. Kami membayangkan dunia di mana setiap ruang 
        dapat dikustomisasi secara instan, dipasang dengan presisi, dan dikelola secara transparan – 
        semua dalam satu platform terpadu.
      </p>
    </div>
    <div className="order-2 md:order-2 flex justify-center" data-aos="fade-left">
      <img 
        src={VisionImage} 
        alt="Visi BlockFix" 
        className="rounded-2xl shadow-xl shadow-[#7C3AED]/20 max-w-md w-full"
      />
    </div>
  </div>
</section>

{/* Misi Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div className="order-2 md:order-1 flex justify-center" data-aos="fade-right">
      <img 
        src={MissionImage} 
        alt="Misi BlockFix" 
        className="rounded-2xl shadow-xl shadow-[#7C3AED]/20 max-w-md w-full"
      />
    </div>
    <div className="order-1 md:order-2" data-aos="fade-left">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400">
        Misi Kami
      </h2>
      <ul className="space-y-5 text-lg text-gray-700 leading-relaxed">
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1">•</span>
          <span>
            <strong className="text-[#7C3AED]">Mendesentralisasi industri interior</strong> melalui platform berbasis blockchain yang memberdayakan tukang lokal dan memberi kontrol penuh kepada pelanggan.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1">•</span>
          <span>
            <strong className="text-[#7C3AED]">Mengotomatisasi desain interior</strong> dengan AI yang memahami preferensi gaya hidup modern.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1">•</span>
          <span>
            <strong className="text-[#7C3AED]">Menginovasi material bangunan</strong> dengan WPC/PVC berkualitas tinggi yang ramah lingkungan.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1">•</span>
          <span>
            <strong className="text-[#7C3AED]">Mengintegrasikan smart technology</strong> ke dalam setiap elemen ruang hidup.
          </span>
        </li>
      </ul>
    </div>
  </div>
</section>


{/* Produk Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto text-center">
    <h2 
      className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400"
      data-aos="fade-up"
    >
      Solusi Lengkap untuk Hunian Modern
    </h2>
    <p 
      className="text-lg text-gray-700 max-w-3xl mx-auto mb-12"
      data-aos="fade-up"
    >
      Dari material hingga teknologi, kami menyediakan segala kebutuhan untuk ruang hidup yang cerdas dan stylish.
    </p>
    
    <div className="grid md:grid-cols-3 gap-8" data-aos="fade-up">
      {/* Card 1 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#7C3AED]/40 hover:-translate-y-2">
        <img 
          src={ProductImage} 
          alt="Produk BlockFix" 
          className="h-20 mx-auto mb-6"
        />
        <h3 className="text-xl font-semibold mb-3 text-[#7C3AED]">Material Inovatif</h3>
        <p className="text-gray-600">
          Wall panel WPC/PVC premium yang tahan lama, ringan, dan ramah lingkungan.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#7C3AED]/40 hover:-translate-y-2">
        <img 
          src={SmartImage} 
          alt="Smart Interior" 
          className="h-20 mx-auto mb-6"
        />
        <h3 className="text-xl font-semibold mb-3 text-[#7C3AED]">Smart Home Device</h3>
        <p className="text-gray-600">
          Perangkat IoT dan perangkat cerdas terintegrasi untuk kontrol ruangan yang otomatis.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#7C3AED]/40 hover:-translate-y-2">
        <img 
          src={FurnishImage} 
          alt="Modular Design" 
          className="h-20 mx-auto mb-6"
        />
        <h3 className="text-xl font-semibold mb-3 text-[#7C3AED]">Furniture Modular</h3>
        <p className="text-gray-600">
          Furniture dan partisi yang dapat dikonfigurasi sesuai kebutuhan ruang.
        </p>
      </div>
    </div>
  </div>
</section>

 {/* Teknologi Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div className="order-1" data-aos="fade-right">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400">
        Teknologi Revolusioner Kami
      </h2>
      <ul className="space-y-5 text-lg text-gray-700">
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>
            <strong className="text-[#7C3AED]">AI Interior Designer</strong> — Sistem AI yang menganalisis preferensi, kebiasaan, dan kebutuhan ruang Anda untuk menghasilkan desain personal dalam hitungan menit.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>
            <strong className="text-[#7C3AED]">Smart Contract Blockchain</strong> — Transaksi aman dan transparan, setiap tahap proyek tercatat permanen di blockchain.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>
            <strong className="text-[#7C3AED]">AR Visualization</strong> — Pratinjau desain langsung di ruang Anda lewat teknologi augmented reality sebelum pemasangan.
          </span>
        </li>
      </ul>
    </div>

    <div className="order-2 flex justify-center" data-aos="fade-left">
      <img 
        src={TechnologyImage} 
        alt="Teknologi BlockFix" 
        className="rounded-2xl shadow-xl shadow-[#7C3AED]/10 max-w-md w-full"
      />
    </div>
  </div>
</section>


 {/* Blockchain Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    <div className="order-2 md:order-1 flex justify-center" data-aos="fade-right">
      <img 
        src={BlockchainImage} 
        alt="Blockchain BlockFix" 
        className="rounded-2xl shadow-xl shadow-[#7C3AED]/10 max-w-md w-full"
      />
    </div>
    
    <div className="order-1 md:order-2" data-aos="fade-left">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400">
        Transparansi dengan Blockchain
      </h2>
      
      <p className="text-lg text-gray-700 mb-6">
        Kami memanfaatkan teknologi blockchain untuk menciptakan <strong className="text-[#7C3AED]">ekosistem yang adil dan terbuka</strong>:
      </p>
      
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>Pembayaran dengan crypto untuk transaksi tanpa batas dan cepat</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>Sertifikat kepemilikan digital (NFT) untuk material dan desain</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>Reputasi tukang yang terverifikasi dan tidak dapat dimanipulasi</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#7C3AED] mr-3 mt-1 text-xl">•</span>
          <span>Reward system berbasis token untuk pelanggan setia</span>
        </li>
      </ul>
    </div>
    
  </div>
</section>


{/* Impact Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    
    <div className="text-center mb-16">
      <h2 
        className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400"
        data-aos="fade-up"
      >
        Dampak Positif yang Kami Ciptakan
      </h2>
      <p 
        className="text-lg text-gray-700 max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        BlockFix tidak hanya mengubah cara berinterior, tapi juga menciptakan dampak sosial yang nyata
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8" data-aos="fade-right">
        
        <div className="bg-gray-100 rounded-xl p-6 shadow-md shadow-[#7C3AED]/10">
          <div className="flex items-start">
            <div className="bg-[#7C3AED]/10 p-3 rounded-lg mr-4">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#7C3AED]">Keberlanjutan</h3>
              <p className="text-gray-700">Material WPC/PVC kami mengurangi ketergantungan pada kayu alam dan lebih tahan lama</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-6 shadow-md shadow-[#7C3AED]/10">
          <div className="flex items-start">
            <div className="bg-[#7C3AED]/10 p-3 rounded-lg mr-4">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#7C3AED]">Digitalisasi Tukang</h3>
              <p className="text-gray-700">Pelatihan dan sertifikasi tukang lokal untuk meningkatkan kualitas SDM industri</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-xl p-6 shadow-md shadow-[#7C3AED]/10">
          <div className="flex items-start">
            <div className="bg-[#7C3AED]/10 p-3 rounded-lg mr-4">
              <span className="text-2xl">🔗</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#7C3AED]">Ekonomi Terdesentralisasi</h3>
              <p className="text-gray-700">Sistem reward blockchain yang memberdayakan pekerja lepas</p>
            </div>
          </div>
        </div>

      </div>
      
      <div className="flex justify-center" data-aos="fade-left">
        <img 
          src={ImpactImage} 
          alt="Dampak Sosial" 
          className="rounded-2xl shadow-xl shadow-[#7C3AED]/10 max-w-md w-full"
        />
      </div>
    </div>
    
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-4xl mx-auto text-center">
    <h2
      className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400 mb-4"
      data-aos="fade-up"
    >
      Siap Mengalami Revolusi Interior?
    </h2>
    <p
      className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
      data-aos="fade-up"
    >
      Bergabunglah dengan komunitas pionir yang telah merasakan kemudahan desain berbasis teknologi.
      Dapatkan desain instan, pemasangan profesional, dan kontrol penuh melalui platform kami.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up">
      <a
        href="/register"
        className="px-6 py-3 rounded-full bg-[#7C3AED] text-white font-semibold shadow-md hover:bg-[#6b21a8] transition"
      >
        Daftar sebagai Pelanggan
      </a>
      <a
        href="/tukang/register"
        className="px-6 py-3 rounded-full border-2 border-[#7C3AED] text-[#7C3AED] font-semibold hover:bg-[#7C3AED] hover:text-white transition"
      >
        Daftar sebagai Tukang
      </a>
    </div>
  </div>
</section>

        <Footer />
    </div>
  );
};

export default About;