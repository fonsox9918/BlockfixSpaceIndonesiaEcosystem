import React, { useState } from 'react';

const SearchSort = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
      {/* Search Input - Lebar penuh di mobile, 2/3 di desktop */}
      <div className="relative flex-1 md:flex-[2]">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Cari produk..."
          className="w-full p-3 md:p-2 border border-gray-300 rounded-lg md:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Sort Select - Lebar penuh di mobile, 1/3 di desktop */}
      <div className="flex-1">
        <select
          onChange={handleSortChange}
          className="w-full p-3 md:p-2 border border-gray-300 rounded-lg md:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        >
          <option value="name">Urutkan: Nama</option>
          <option value="price">Urutkan: Harga</option>
          <option value="popular">Urutkan: Popularitas</option>
          <option value="newest">Urutkan: Terbaru</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchSort;