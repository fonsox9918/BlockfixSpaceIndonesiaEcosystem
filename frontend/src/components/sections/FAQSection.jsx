import React, { useState } from 'react';
import './FAQSection.css';

const faqs = [
  {
    question: 'Apa itu BlockFix Interior?',
    answer: 'BlockFix Interior adalah platform pemasangan WPC dan PVC berbasis teknologi AI & blockchain untuk desain otomatis dan sistem kontrak pintar.'
  },
  {
    question: 'Bagaimana cara kerja AI dalam BlockFix?',
    answer: 'AI kami akan membaca foto ruangan Anda dan menyarankan desain serta estimasi biaya sesuai produk pilihan Anda.'
  },
  {
    question: 'Apakah saya bisa membayar dengan crypto?',
    answer: 'Ya! Kami mendukung pembayaran dengan cryptocurrency dan juga metode lokal lainnya.'
  },
  {
    question: 'Apakah kontrak digital ini aman?',
    answer: 'Kontrak digital kami berbasis blockchain dan smart contract untuk menjamin transparansi serta keamanan proyek.'
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container text-white">
        <h2 className="text-center mb-5">Pertanyaan Umum</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;