import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import ilustrasi1 from '../../assets/images/hero-ilustrasi.png';
import ilustrasi2 from '../../assets/images/hero-ilustrasi2.png';
import ilustrasi3 from '../../assets/images/hero-ilustrasi3.png';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-12">

        {/* RIGHT SWIPER */}
        <div className="flex-1 w-full max-w-md">
          <Swiper
            spaceBetween={20}
            centeredSlides={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="rounded-xl overflow-hidden min-h-[300px]"
          >
            <SwiperSlide>
              <img src={ilustrasi1} alt="slide1" className="w-full h-auto object-contain" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={ilustrasi2} alt="slide2" className="w-full h-auto object-contain" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={ilustrasi3} alt="slide3" className="w-full h-auto object-contain" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* LEFT TEXT */}
        <div className="flex-1 w-full text-base md:text-lg space-y-6 p-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Transformasi Interior Anda,<br />
            <span className="text-[#7C3AED]">Secara Cerdas dan Otomatis</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Solusi pemasangan plafon & dinding WPC/PVC berbasis AI & Blockchain
          </p>
          <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center md:justify-start">
            <Link to="/room-design" className="no-underline">
              <button className="flex items-center justify-center gap-2 px-4 py-2 h-12 text-sm font-medium bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white rounded-xl shadow-md transition hover:opacity-90">
                Konsultasi Gratis
              </button>
            </Link>
            <Link to="/layanan" className="no-underline">
              <button className="flex items-center justify-center gap-2 px-4 py-2 h-12 text-sm font-medium bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] text-white rounded-xl shadow-md transition hover:opacity-90">
                Lihat Produk Jasa
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
