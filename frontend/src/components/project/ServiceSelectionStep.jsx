// src/components/project/ServiceSelectionStep.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    id: "wall-panel",
    title: "Interior Wall Panel",
    description: "Panel dinding WPC dan PVC Marble estetik dan tahan lama.",
    image: "https://via.placeholder.com/400x300",
  },
  {
    id: "plafond",
    title: "PVC Plafond",
    description: "Plafond PVC modern dan tahan lembab untuk berbagai ruangan.",
    image: "https://via.placeholder.com/400x300",
  },
  {
    id: "smart-device",
    title: "Smart Device",
    description: "CCTV, smart lock, dan sensor pintar untuk rumah aman dan nyaman.",
    image: "https://via.placeholder.com/400x300",
  },
  {
    id: "modular-device",
    title: "Modular Device",
    description: "Rak, wastafel, shower modular custom untuk interior fungsional.",
    image: "https://via.placeholder.com/400x300",
  },
];

const ServiceSelectionStep = ({ onSelect }) => {
  return (
    <div className="bg-[#0a142f] min-h-screen py-10 px-4 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Pilih Kategori Jasa</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            onClick={() => onSelect(service.id)}
            className="cursor-pointer bg-[#161636] hover:bg-blue-900 rounded-2xl p-4 transition group shadow hover:shadow-lg"
          >
            <div
              className="h-40 bg-cover bg-center rounded-xl mb-4"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <h3 className="text-xl font-semibold group-hover:text-blue-400">{service.title}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelectionStep;