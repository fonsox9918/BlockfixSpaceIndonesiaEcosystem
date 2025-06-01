import { CheckCircle } from "lucide-react";
import ilustrasi3 from '../../assets/images/gambarwpc.png';

const features = [
  "Material Premium WPC & PVC",
  "Konsultasi Desain Real-Time",
  "Instalasi Cepat & Terjadwal"
];

export default function InteriorFeatureSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        
        {/* Gambar Kolase */}
        <div className="w-full">
          <img
            src={ilustrasi3}
            alt="Kolase Interior BlockFix"
            className="rounded-3xl w-full h-auto object-cover shadow-2xl"
          />
        </div>

        {/* Konten Teks */}
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
            Desain Berbeda, Solusi yang Sama — <span className="text-[#7C3AED]">BlockFix</span>
          </h2>
          <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
            Percayakan instalasi plafon dan dinding ruangan Anda pada BlockFix. Kami hadir dengan solusi WPC & PVC berkualitas tinggi, tampilan modern, dan pemasangan profesional.
          </p>

          <ul className="space-y-4 mb-6">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-[#7C3AED] w-5 h-5 mt-1" />
                <span className="text-gray-800 text-sm md:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="bg-[#7C3AED] hover:bg-[#6b2dd1] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300">
            Pelajari Layanan Kami
          </button>
        </div>
      </div>
    </section>
  );
}
