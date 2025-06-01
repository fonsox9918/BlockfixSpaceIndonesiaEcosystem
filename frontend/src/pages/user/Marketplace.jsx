import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../firebase/productService';
import SearchBar from '../../components/marketplace/searchBar';
import FilterBar from '../../components/marketplace/FilterBar';
import ProductGrid from '../../components/marketplace/ProductGrid';
import ProductDetailModal from '../../components/marketplace/ProductDetailModal';
import NavbarBlockFix from '../../components/navbar/NavbarBlockFix';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        console.log('Fetched products:', data); // Debug log
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange.min) {
      result = result.filter(product => product.price >= Number(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      result = result.filter(product => product.price <= Number(filters.priceRange.max));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
        break;
      case 'newest':
      default:
        // Assuming products have a timestamp or id that indicates recency
        result.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarBlockFix />
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Sidebar on desktop, top on mobile */}
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              onProductClick={handleProductClick}
            />
          </div>
        </div>

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
};

export default Marketplace;
