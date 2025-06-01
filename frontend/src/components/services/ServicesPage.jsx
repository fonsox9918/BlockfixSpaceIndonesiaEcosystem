import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    name: "Plafon PVC",
    slug: "plafon-pvc",
    image: "https://via.placeholder.com/400x250?text=Plafon+PVC",
    description: "Solusi plafon ringan, tahan air, dan mudah perawatan.",
  },
  {
    id: 2,
    name: "WPC (Wall Panel)",
    slug: "wpc-wall-panel",
    image: "https://via.placeholder.com/400x250?text=WPC",
    description: "Panel dinding modern dengan bahan tahan lama dan estetis.",
  },
  {
    id: 3,
    name: "Furniture Custom",
    slug: "furniture-custom",
    image: "https://via.placeholder.com/400x250?text=Furniture",
    description: "Furniture custom sesuai desain dan kebutuhan ruang Anda.",
  },
  {
    id: 4,
    name: "Smart Home Device",
    slug: "smart-home-device",
    image: "https://via.placeholder.com/400x250?text=Smart+Home+Device",
    description: "Solusi perangkat pintar untuk kenyamanan dan efisiensi rumah Anda.",
  },
  {
    id: 5,
    name: "Aksesoris Interior",
    slug: "aksesoris-interior",
    image: "https://via.placeholder.com/400x250?text=Aksesoris+Interior",
    description: "Lengkapi interior Anda dengan aksesoris yang estetis dan fungsional.",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Daftar Layanan Blocrix</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {services.map(service => (
          <div
            key={service.id}
            onClick={() => navigate(`/layanan/${service.slug}`)}
            className="cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 flex-grow">{service.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/layanan/${service.slug}`);
                }}
                className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}