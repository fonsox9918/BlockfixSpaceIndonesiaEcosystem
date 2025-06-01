import React, { useState } from 'react';

const CategoryFilter = ({ products, setFilteredProducts }) => {
  const categories = ['Plafond PVC', 'WPC', 'Smart Device', 'Furniture', 'Aksesoris'];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    // Memfilter produk berdasarkan kategori yang dipilih
    if (category === 'All') {
      setFilteredProducts(products); // Menampilkan semua produk jika kategori 'All' dipilih
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered); // Menampilkan produk yang sesuai kategori
    }
  };

  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-semibold mb-4">Filter Kategori</h2>
      <div className="flex justify-center flex-wrap gap-3">
        <button
          onClick={() => handleFilterChange('All')}
          className={`py-2 px-4 rounded-full text-white ${selectedCategory === 'All' ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-600`}
        >
          Semua
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(category)}
            className={`py-2 px-4 rounded-full text-white ${selectedCategory === category ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-600`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;