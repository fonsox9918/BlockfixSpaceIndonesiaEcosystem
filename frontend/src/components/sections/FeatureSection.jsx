import {
  Brush,
  Calculator,
  ShieldCheck,
  Wallet,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Brush,
    title: "Desain Otomatis AI",
    desc: "Upload foto ruangan, AI kami akan mendesain otomatis sesuai produk pilihan."
  },
  {
    icon: Calculator,
    title: "Perhitungan Otomatis",
    desc: "Kalkulasi biaya pemasangan otomatis dari AI."
  },
  {
    icon: ShieldCheck,
    title: "Smart Contract",
    desc: "Kontrak pintar dengan sistem pembayaran terdesentralisasi guna menjamin keamanan."
  },
  {
    icon: Wallet,
    title: "Crypto & Lokal Payment",
    desc: "Sistem pembayaran modern & konvensional."
  }
];

export default function FeatureSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Judul */}
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Fitur Unggulan <span className="text-[#7C3AED]">BlockFix</span>
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Jelajahi fitur-fitur canggih kami yang menggabungkan AI, otomasi, dan sistem Web3
            untuk pengalaman desain interior yang cerdas dan aman.
          </p>
        </div>

        {/* Navigasi Panah */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[55%] sm:hidden bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft className="text-[#7C3AED]" size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[55%] sm:hidden bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight className="text-[#7C3AED]" size={24} />
        </button>

        {/* Fitur Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:overflow-visible"
        >
          {features.map((feature, index) => (
<div
  key={index}
  className="snap-start flex-shrink-0 w-[85vw] sm:w-auto border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition box-border"
>

              <div className="flex items-center justify-center mb-4 text-[#7C3AED]">
                <feature.icon size={42} strokeWidth={2.5} />
              </div>
              <h3 className="text-md font-semibold text-black mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
