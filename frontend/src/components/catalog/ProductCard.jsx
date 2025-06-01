// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="relative pt-[100%] bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {product.discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {product.discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-1">
            {product.name}
          </h3>
          <div className="mb-1">
            <span className="text-base font-bold text-gray-900">
              Rp{Number(product.price).toLocaleString('id-ID')}
            </span>
            {product.originalPrice && (
              <span className="ml-1 text-xs text-gray-500 line-through">
                Rp{Number(product.originalPrice).toLocaleString('id-ID')}
              </span>
            )}
          </div>
          {product.discountTag && (
            <div className="text-xs text-red-500 font-medium mb-2">
              {product.discountTag}
            </div>
          )}
          <div className="flex items-center text-xs">
            <span className="text-yellow-400">★ {product.rating || '5.0'}</span>
            <span className="text-gray-500 ml-1">
              {product.soldCount >= 1000 
                ? `${(product.soldCount / 1000).toFixed(1)}rb` 
                : product.soldCount} terjual
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>{product.shippingTime || '2-5 Hari'}</span>
            <span>{product.location || 'Jakarta'}</span>
          </div>
          {product.stock > 0 && (
            <div className="text-xs text-green-500 mt-1">READY STOCK</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;