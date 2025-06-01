// src/components/navbar/MobileNavGuest.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, Info, Star, LogIn } from "lucide-react";
import logo from "../../assets/logo.png";

export default function MobileNavGuest() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => setOpen(false);
  const handleLoginClick = () => {
    setOpen(false);
    navigate("/auth");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-zinc-950">
      {/* Logo */}
      <Link to="/" onClick={handleNavClick} className="flex items-center space-x-2 no-underline">
        <img src={logo} alt="Blockfix Logo" className="h-8 w-auto" />
        <span className="font-bold text-lg text-[#7C3AED]">Blockfix Space</span>
      </Link>

      {/* Toggle Menu */}
      <button
        onClick={() => setOpen(!open)}
        className="text-zinc-700 dark:text-zinc-200 focus:outline-none"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Dropdown Slide-In Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-zinc-950 border-l z-50 shadow-lg transition-all duration-300 transform ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-zinc-700 dark:text-zinc-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-4 px-6 pt-4">
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center no-underline space-x-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-[#7C3AED]"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
          <Link
            to="/about"
            onClick={handleNavClick}
            className="flex items-center no-underline space-x-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-[#7C3AED]"
          >
            <Info className="w-4 h-4" />
            <span>Tentang</span>
          </Link>
          <Link
            to="/layanan"
            onClick={handleNavClick}
            className="flex items-center no-underline space-x-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-[#7C3AED]"
          >
            <Star className="w-4 h-4" />
            <span>Fitur</span>
          </Link>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4" />

          <button
            onClick={handleLoginClick}
            className="flex items-center justify-center space-x-2 rounded-md bg-[#7C3AED] text-white px-4 py-2 text-sm font-medium hover:bg-[#6B21A8] transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
