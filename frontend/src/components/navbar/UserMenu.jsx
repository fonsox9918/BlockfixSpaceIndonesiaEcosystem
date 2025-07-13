// src/components/navbar/UserMenu.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  MessageCircle,
  Settings,
  LayoutDashboard,
  User,
  Folder
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/firebaseConfig";

export default function UserMenu() {
  const { currentUser, profilePhoto } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // ⬅️ tambahkan ini

  const initials = currentUser?.fullName
    ? currentUser.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "US";

  const handleLogout = async () => {
    await auth.signOut();      // ⬅️ pastikan pakai `await`
    setOpen(false);
    navigate("/");             // ⬅️ redirect ke halaman home
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-semibold focus:outline-none"
      >
        {profilePhoto ? (
          <img src={profilePhoto} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
        ) : (
          initials
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 shadow-md rounded-md z-50">
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              {currentUser?.fullName || "User"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentUser?.email}
            </p>
          </div>
          <ul className="py-1 text-sm text-zinc-800 dark:text-zinc-100">
            <li><Link to="/account-page" className="flex items-center px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 no-underline"><User className="mr-2 w-4 h-4" /> Akun Saya</Link></li>
            <li><Link to="/myorders" className="flex items-center px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 no-underline"><MessageCircle className="mr-2 w-4 h-4" /> Pesanan Saya</Link></li>
            <li><Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 no-underline"><LayoutDashboard className="mr-2 w-4 h-4" /> Dashboard</Link></li>
            <li><Link to="/project-tracker" className="flex items-center px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 no-underline"><Folder className="mr-2 w-4 h-4" /> Proyek</Link></li>
            <li><Link to="/account-page" className="flex items-center px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 no-underline"><Settings className="mr-2 w-4 h-4" /> Pengaturan</Link></li>
          </ul>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <LogOut className="mr-2 w-4 h-4" /> Keluar
          </button>
        </div>
      )}
    </div>
  );
}
