import { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  MessageCircle,
  LayoutDashboard,
  Folder,
  Settings,
  Home,
  Info,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/firebaseConfig";
import logo from "../../assets/logo.png";

export default function MobileNavUser() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    setOpen(false);
    navigate("/");
  };

  const handleNavClick = () => setOpen(false);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-zinc-950">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Blockfix Logo" className="h-8 w-auto" />
        <span className="font-bold text-lg text-[#7C3AED]">Blockfix Space</span>
      </Link>

      <button
        onClick={() => setOpen(!open)}
        className="text-zinc-700 dark:text-zinc-200"
        aria-label={open ? "Tutup menu" : "Buka menu"}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Panel dropdown */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-zinc-950 shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button di pojok kanan atas */}
        <div className="flex justify-end p-3 border-b border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-700 dark:text-zinc-200"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header User Info */}
        <div className="px-4 py-4 border-b flex items-center space-x-3">
          <img
            src={
              currentUser?.photoURL ||
              "https://ui-avatars.com/api/?name=User&background=random"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              {currentUser?.fullName || "Pengguna"}
            </div>
            <div className="text-sm text-zinc-500">{currentUser?.email}</div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col py-4 text-sm">
          <NavItem
            icon={<LayoutDashboard className="w-4 h-4" />}
            to="/account-page"
            label="Akun Saya"
            onClick={handleNavClick}
          />
          <NavItem
            icon={<MessageCircle className="w-4 h-4" />}
            to="/messages"
            label="Pesan"
            onClick={handleNavClick}
          />
          <NavItem
            icon={<LayoutDashboard className="w-4 h-4" />}
            to="/dashboard"
            label="Dashboard"
            onClick={handleNavClick}
          />
          <NavItem
            icon={<Folder className="w-4 h-4" />}
            to="/projects"
            label="Proyek"
            onClick={handleNavClick}
          />
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            to="/settings"
            label="Pengaturan"
            onClick={handleNavClick}
          />

          <div className="border-t my-4" />

          <NavItem
            icon={<Home className="w-4 h-4" />}
            to="/"
            label="Beranda"
            onClick={handleNavClick}
          />
          <NavItem
            icon={<Info className="w-4 h-4" />}
            to="/about"
            label="Tentang"
            onClick={handleNavClick}
          />
          <NavItem
            icon={<Star className="w-4 h-4" />}
            to="/layanan"
            label="Fitur"
            onClick={handleNavClick}
          />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

// Komponen reusable item menu
function NavItem({ icon, to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition no-underline"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
