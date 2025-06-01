// src/components/navbar/DesktopNavUser.jsx
import { Link } from "react-router-dom";
import { Home, Settings, Info, Star } from "lucide-react";
import UserMenu from "./UserMenu";

const navItems = [
  { label: "Beranda", icon: <Home className="w-4 h-4" />, link: "/" },
  { label: "Layanan", icon: <Settings className="w-4 h-4" />, link: "#" },
  { label: "Tentang", icon: <Info className="w-4 h-4" />, link: "#" },
  { label: "Fitur", icon: <Star className="w-4 h-4" />, link: "#" },
];

export default function DesktopNavUser() {
  return (
    <header className="hidden md:flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-950">
      <Link to="/" className="font-bold text-lg text-[#7C3AED]">Blockfix Space</Link>
      <nav className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className="flex items-center space-x-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-[#7C3AED]"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <UserMenu />
    </header>
  );
}
