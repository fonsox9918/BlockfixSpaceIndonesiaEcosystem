'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/assets/slider1.jpg",
    title: "Layanan Jasa Interior Modern",
    subtitle: "Wujudkan Keamanan Renovasi Rumah",
  },
  {
    id: 2,
    image: "/assets/slider2.jpg",
    title: "Desain Kitchen Set Premium",
    subtitle: "Harga Terjangkau, Material Berkualitas",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        >
          <div className="h-full w-full bg-black/40 flex flex-col justify-center px-6 md:px-12">
            <h2 className="text-white text-xl md:text-4xl font-bold mb-2">{slides[current].title}</h2>
            <p className="text-white text-sm md:text-lg mb-4">{slides[current].subtitle}</p>
            <a
              href="#formEstimasi"
              className="inline-block bg-white text-black px-4 py-2 rounded-md font-medium shadow"
            >
              Tanya Selengkapnya
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
