import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { auth } from '../../firebase/firebaseConfig'; // Impor auth dari Firebase
import logo from "../../assets/logo.png";

const Header = ({ onSearch, onCategoryFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menyimpan status login
  const [userData, setUserData] = useState(null); // Menyimpan data pengguna
  const navigate = useNavigate();

  const categories = ['Semua', 'Plafond PVC', 'WPC', 'Smart Device', 'Furniture', 'Aksesoris'];

  useEffect(() => {
    // Menggunakan onAuthStateChanged untuk memantau status login
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);  // Pengguna sudah login
        setUserData(user); // Menyimpan data pengguna
      } else {
        setIsLoggedIn(false);  // Pengguna belum login
        setUserData(null); // Reset data pengguna
      }
    });

    // Membersihkan listener saat komponen unmount
    return () => unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login-email');
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login-email');
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryFilter) {
      onCategoryFilter(category);
    }
  };

  return (
    <header className="w-full bg-[#0f172a] shadow-md sticky top-0 z-50 text-white">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Logo"
              className="h-10 object-contain"
            />
          </Link>

          <form onSubmit={handleSearch} className="flex-1 mx-2 md:mx-4 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari produk interior..."
                className="w-full py-2 px-4 pr-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 text-gray-800"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <FaSearch size={16} />
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <button 
              onClick={handleCartClick}
              className="p-2 text-white hover:text-blue-300 relative"
            >
              <FaShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button 
              onClick={handleProfileClick}
              className="p-2 text-white hover:text-blue-300"
            >
              {isLoggedIn && userData?.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <FaUser size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#0f172a] overflow-hidden">
        <div className="w-full px-0 md:px-4">
          <div className="flex overflow-x-auto py-2 w-full pl-4 md:pl-0 hide-scrollbar">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`flex-shrink-0 px-4 py-1 mx-1 rounded-full whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-[#00F2FE] text-white shadow-[0_0_16px_#00F2FE,0_0_24px_#4FACFE]'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;