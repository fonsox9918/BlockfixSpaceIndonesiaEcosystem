import React from 'react';

export default function ServiceDetail({ service, onBack }) {
  if (!service) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Layanan tidak ditemukan</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline"
        >
          Kembali ke daftar layanan
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:underline"
      >
        &larr; Kembali ke layanan
      </button>
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <img
        src={service.image}
        alt={service.name}
        className="w-full rounded mb-6"
      />
      <p className="text-lg text-gray-700">{service.description}</p>
    </div>
  );
}