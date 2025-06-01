// src/components/navbar/DesktopNavGuest.jsx
import { Link } from "react-router-dom";
import { Home, Settings, Info, Star, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  { label: "Beranda", icon: <Home className="w-4 h-4" />, link: "/" },
  { label: "Layanan", icon: <Settings className="w-4 h-4" />, link: "#", dropdown: true },
  { label: "Tentang", icon: <Info className="w-4 h-4" />, link: "#", dropdown: true },
  { label: "Fitur", icon: <Star className="w-4 h-4" />, link: "#", dropdown: true },
];

export default function DesktopNavGuest() {
  return (
    <header className="hidden md:flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-950">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold text-lg text-[#7C3AED]">Blockfix Space</Link>
        <nav className="flex space-x-6 ml-8">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group flex items-center space-x-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              <Link to={item.link} className="flex items-center space-x-1 hover:text-[#7C3AED]">
                {item.icon}
                <span>{item.label}</span>
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              {/* Dropdown bisa ditambahkan di sini */}
            </div>
          ))}
        </nav>
      </div>
      <Link to="/auth">
        <Button className="bg-[#7C3AED] text-white hover:bg-[#6B21A8] px-6">Login</Button>
      </Link>
    </header>
  );
}
