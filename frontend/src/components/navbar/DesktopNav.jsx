import { Link } from "react-router-dom";
import {
  Home,
  Settings,
  Info,
  Star,
  ChevronDown,
} from "lucide-react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/form_input/Button";
import logo from "../../assets/logo.png";

export default function DesktopNav() {
  const { currentUser } = useAuth();

  const menuItems = [
    { label: "Beranda", icon: <Home className="w-4 h-4" />, link: "/" },
    { label: "Layanan", icon: <Settings className="w-4 h-4" />, link: "#", dropdown: true },
    { label: "Tentang", icon: <Info className="w-4 h-4" />, link: "#", dropdown: true },
    { label: "Fitur", icon: <Star className="w-4 h-4" />, link: "#", dropdown: true },
  ];

  return (
<header className="hidden md:flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-950">
  {/* Logo dan Nama Brand */}
  <Link to="/" className="flex items-center space-x-2 no-underline">
    <img src={logo} alt="Blockfix Logo" className="h-8 w-auto" />
    <span className="font-bold text-lg text-[#7C3AED]">Blockfix Space</span>
  </Link>

  {/* Menu Tengah */}
  <nav className="flex space-x-6">
    {menuItems.map((item) => (
      <div
        key={item.label}
        className="relative group flex items-center space-x-1 cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-200"
      >
        <Link
          to={item.link}
          className="flex items-center space-x-1 no-underline hover:text-[#7C3AED]"
        >
          {item.icon}
          <span>{item.label}</span>
          {item.dropdown && <ChevronDown className="w-4 h-4" />}
        </Link>
      </div>
    ))}
  </nav>

      {/* Kanan: Guest = Tombol Login | Logged-in = UserMenu */}
      <div>
        {currentUser ? (
          <UserMenu />
        ) : (
          <Link to="/auth">
            <Button className="bg-[#7C3AED] text-white hover:bg-[#6B21A8] px-6">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
