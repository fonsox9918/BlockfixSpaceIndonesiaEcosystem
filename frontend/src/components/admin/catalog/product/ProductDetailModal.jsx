import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    if (product?.id && isOpen) {
      fetchSpecs(product.id);
    }
  }, [product, isOpen]);

  const fetchSpecs = async (productId) => {
    try {
      const res = await axios.get(`/api/product-specs/${productId}`);
      setSpecs(res.data.data);
    } catch (err) {
      console.error('Gagal ambil spesifikasi:', err);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <img src={product.thumbnail} alt="Thumbnail" className="w-full h-40 object-contain mb-2" />
        <p className="text-sm text-gray-700 mb-1">Harga: Rp {product.price.toLocaleString()}</p>
        <p className="text-sm text-gray-700 mb-1">Stok: {product.stock} {product.unit}</p>
        <p className="text-sm text-gray-700 mb-2">Kategori: {product.category}</p>

        <h3 className="text-md font-medium mt-4 mb-1">Spesifikasi:</h3>
        <ul className="text-sm list-disc ml-5">
          {specs.length > 0 ? (
            specs.map((s) => (
              <li key={s.id}>
                <strong>{s.key}:</strong> {s.value}
              </li>
            ))
          ) : (
            <li>Tidak ada spesifikasi</li>
          )}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 w-full"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;