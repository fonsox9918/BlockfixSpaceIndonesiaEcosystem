import React, { useState, useEffect } from 'react';
import { processImageUrl } from '../../utils/imageUtils';

const ProductCard = ({ product, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [validImageUrl, setValidImageUrl] = useState(null);

  // Function to process image URL using utility
  const loadImageUrl = async () => {
    if (!product.images || product.images.length === 0) {
      setValidImageUrl(null);
      setImageLoading(false);
      return;
    }
    
    const imageUrl = product.images[0];
    const processedUrl = await processImageUrl(imageUrl);
    setValidImageUrl(processedUrl);
    setImageLoading(false);
  };

  useEffect(() => {
    loadImageUrl();
  }, [product.images]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div 
      onClick={() => onClick(product)}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative pt-[100%] bg-gray-100">
        {validImageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            <img
              src={validImageUrl}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          </>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 font-medium">{product.name}</p>
            </div>
          </div>
        )}
        {product.discountPercent && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discountPercent}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 md:p-3">
        <h3 className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 h-8 md:h-10 mb-1">
          {product.name}
        </h3>
        <div className="mb-1">
          <span className="text-sm md:text-base font-bold text-gray-900">
            Rp{Number(product.price).toLocaleString('id-ID')}
          </span>
          {product.originalPrice && (
            <span className="ml-1 text-xs text-gray-500 line-through">
              Rp{Number(product.originalPrice).toLocaleString('id-ID')}
            </span>
          )}
        </div>
        {product.discountTag && (
          <div className="text-xs text-red-500 font-medium mb-1 md:mb-2">
            {product.discountTag}
          </div>
        )}
        <div className="flex items-center text-xs">
          <span className="text-yellow-400">★ {product.rating || '5.0'}</span>
          <span className="text-gray-500 ml-1 truncate">
            {product.soldCount >= 1000 
              ? `${(product.soldCount / 1000).toFixed(1)}rb` 
              : product.soldCount} terjual
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-1 md:mt-2">
          <span className="truncate">{product.shippingTime || '2-5 Hari'}</span>
          <span className="truncate">{product.location || 'Jakarta'}</span>
        </div>
        {product.stock > 0 && (
          <div className="text-xs text-green-500 mt-1">READY STOCK</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
