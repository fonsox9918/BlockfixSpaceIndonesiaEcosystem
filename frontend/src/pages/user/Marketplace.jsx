import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/marketplace/searchBar';
import FilterBar from '../../components/marketplace/FilterBar';
import ProductGrid from '../../components/marketplace/ProductGrid';
import ProductDetailModal from '../../components/marketplace/ProductDetailModal';
import NavbarBlockFix from '../../components/navbar/NavbarBlockFix';
import BlockfixSpinner from '../../components/animasi/BlockfixSpinner';
import ProductCard from '../../components/marketplace/ProductCard';

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

  // Fetch products from backend API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Fetched products from backend:', result); // Debug log
        
        // Extract data array from the API response
        const data = result.data || [];
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products from backend. Please try again later.');
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

  // Show loading spinner while fetching data
  if (loading) {
    return <BlockfixSpinner />;
  }

  // Show error message if fetch failed
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
      <div className="max-w-7xl mx-auto px-4 py-8 pt-8">
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
            {/* Display products if available, otherwise show empty state */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || index}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products available from backend API</p>
                <p className="text-gray-400 text-sm mt-2">
                  The backend is returning an empty products array
                </p>
              </div>
            )}
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
