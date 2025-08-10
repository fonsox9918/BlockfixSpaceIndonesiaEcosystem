import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { cartService } from '../../services/cartService';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!currentUser) {
      toast.error('Silakan login terlebih dahulu untuk menambahkan produk ke keranjang');
      return;
    }

    setIsAddingToCart(true);

    try {
      // Call the cart API
      const response = await cartService.addToCart(product.id, 1);
      
      if (response.success) {
        toast.success('Produk berhasil ditambahkan ke keranjang');
        console.log('Cart updated:', response.data);
        
        // Show option to go to cart
        setTimeout(() => {
          toast.success(
            <div className="flex flex-col space-y-2">
              <span>Produk berhasil ditambahkan!</span>
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Lihat Keranjang
              </button>
            </div>,
            { duration: 5000 }
          );
        }, 500);
      } else {
        toast.error(response.message || 'Gagal menambahkan produk ke keranjang');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Handle specific error cases
      if (error.message.includes('not authenticated')) {
        toast.error('Silakan login terlebih dahulu');
      } else if (error.message.includes('Product not found')) {
        toast.error('Produk tidak ditemukan');
      } else {
        toast.error('Gagal menambahkan produk ke keranjang. Silakan coba lagi.');
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    // Check if user is authenticated
    if (!currentUser) {
      toast.error('Silakan login terlebih dahulu untuk melakukan pembelian');
      return;
    }

    setIsBuyingNow(true);

    try {
      // Add to cart first
      const response = await cartService.addToCart(product.id, 1);
      
      if (response.success) {
        toast.success('Mengarahkan ke checkout...');
        onClose();
        // Navigate directly to checkout
        navigate('/checkout');
      } else {
        toast.error(response.message || 'Gagal memproses pembelian');
      }
    } catch (error) {
      console.error('Error in buy now:', error);
      
      if (error.message.includes('not authenticated')) {
        toast.error('Silakan login terlebih dahulu');
      } else {
        toast.error('Gagal memproses pembelian. Silakan coba lagi.');
      }
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[85vh] shadow-xl flex flex-col">
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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
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
            </div>
          </div>

          {/* Fixed Action Buttons */}
          <div className="flex-shrink-0 border-t bg-white p-6 rounded-b-lg">
            <div className="flex space-x-4">
              <button 
                onClick={handleBuyNow}
                disabled={isBuyingNow || isAddingToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isBuyingNow ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Beli Sekarang'
                )}
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || isBuyingNow}
                className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menambahkan...
                  </>
                ) : (
                  '+ Keranjang'
                )}
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex justify-center space-x-6 mt-4 pt-4 border-t">
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Lihat Keranjang
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/myorders');
                }}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Pesanan Saya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
