import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../firebase/productService';

const FilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapsed by default on mobile

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange({ category });
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange({ sortBy: value });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Collapsible Header - Only visible on mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleCollapse}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-semibold text-gray-900">Filter & Urutkan</span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Content - Collapsible on mobile, always visible on desktop */}
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'} p-4 space-y-6`}>
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Categories</h3>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Sort By</h3>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            setSelectedCategory('');
            setPriceRange({ min: '', max: '' });
            setSortBy('newest');
            onFilterChange({
              category: '',
              priceRange: { min: '', max: '' },
              sortBy: 'newest'
            });
          }}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
