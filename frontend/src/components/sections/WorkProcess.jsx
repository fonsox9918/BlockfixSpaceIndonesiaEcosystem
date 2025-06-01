import React, { useState, useEffect, useRef } from 'react';
import './WorkProcess.css';

import Konsultasi from '/images/Konsultasi.png';
import DesignAi from '/images/DesigmAi.png';
import Survey from '/images/Survey.png';
import Payment from '/images/Payment.png';
import Material from '/images/Material.png';
import Finishing from '/images/Finishing.png';

const steps = [
  {
    tag: 'Langkah 1',
    title: 'Konsultasi Awal',
    description: 'Diskusikan kebutuhan dan preferensi interior kamu dengan AI Assistant kami secara gratis.',
    note: 'Gratis',
    image: Konsultasi,
  },
  {
    tag: 'Langkah 2',
    title: 'Desain Otomatis oleh AI',
    description: 'Sistem AI kami akan membuatkan desain ruangan sesuai input dan preferensimu, tanpa perlu desainer manusia.',
    image: DesignAi,
  },
  {
    tag: 'Langkah 3',
    title: 'Survey Lokasi & Kontrak',
    description: 'Tim teknisi akan melakukan survey pengukuran, dilanjutkan dengan penandatanganan kontrak kerja sama.',
    image: Survey,
  },
  {
    tag: 'Langkah 4',
    title: 'Billing Booking Fee (DP)',
    description: 'Setelah kontrak, kamu akan menerima invoice Booking Fee melalui email dan aplikasi kami.',
    image: Payment,
  },
  {
    tag: 'Langkah 5',
    title: 'Pengiriman Material & Pengerjaan',
    description: 'Material dikirim dan pemasangan dilakukan di hari yang sama sesuai jadwal yang disepakati.',
    image: Material,
  },
  {
    tag: 'Langkah 6',
    title: 'Pelunasan & Serah Terima',
    description: 'Saat progres sudah mencapai 75%, billing pelunasan akan dikirim. Setelah pengecekan kualitas, interior siap dihuni.',
    image: Finishing,
  },
];

const WorkProcess = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="workprocess" className="workprocess-container">
      <h1 className="section-title">6 Langkah Menuju Interior Impianmu</h1>

      <div
        className="workprocess-slider"
        ref={slideRef}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {steps.map((step, index) => (
          <div className="workprocess-slide" key={index}>
            <div className="image-container">
              <img src={step.image} alt={step.title} className="workprocess-image" />
            </div>
            <div className="workprocess-content">
              {step.tag && <span className="step-tag">{step.tag}</span>}
              <h2>{step.title}</h2>
              <p>{step.description}</p>
              {step.note && <span className="step-note">{step.note}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="workprocess-dots">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;