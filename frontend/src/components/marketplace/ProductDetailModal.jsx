import React from 'react';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-2xl w-full shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-50"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-6">
            {/* Product Images */}
            <div className="relative aspect-w-16 aspect-h-9 mb-6">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  Rp{Number(product.price).toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    Rp{Number(product.originalPrice).toLocaleString('id-ID')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.soldCount} sold</span>
                <span>•</span>
                <span>{product.location}</span>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Estimated delivery: {product.shippingTime}</p>
                  <p>Ships from: {product.location}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Buy Now
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
