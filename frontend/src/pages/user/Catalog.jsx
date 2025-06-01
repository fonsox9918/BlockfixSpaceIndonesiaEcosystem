import React, { useState, useEffect } from 'react';
import Header from '../../components/catalog/Header';
import ProductGrid from '../../components/catalog/ProductGrid';
import Footer from '../../components/common/Footer';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products');
      if (!res.ok) {
        throw new Error('Gagal fetch produk');
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSort = (sortOption) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price') {
        return a.price - b.price;
      } else if (sortOption === 'popular') {
        return b.popularity - a.popularity;
      } else if (sortOption === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const handleCategoryFilter = (category) => {
    if (category === 'Semua') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSearch={handleSearch}
        onSort={handleSort}
        onCategoryFilter={handleCategoryFilter}
      />

      <main className="flex-grow p-4 md:p-8">
        {error && <p className="text-red-500">{error}</p>}

        <ProductGrid
          products={filteredProducts}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          paginate={paginate}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;