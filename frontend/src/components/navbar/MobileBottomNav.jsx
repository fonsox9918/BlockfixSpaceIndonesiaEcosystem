//src/components/navbar/MobileBottomNav.jsx
import { LayoutDashboard, Settings, Wand2, CreditCard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    link: "/dashboard",
  },
  {
    label: "Layanan",
    icon: <Settings className="w-5 h-5" />,
    link: "/services",
  },
  {
    label: "Design AI",
    icon: <Wand2 className="w-5 h-5" />,
    link: "/design-ai",
  },
  {
    label: "Transaksi",
    icon: <CreditCard className="w-5 h-5" />,
    link: "/transactions",
  },
];

export default function MobileBottomNav() {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-zinc-950 border-t flex justify-around py-2 shadow-sm">
      {navItems.map((item) => {
        const isActive = location.pathname === item.link;
        return (
          <Link
            key={item.label}
            to={item.link}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-[#7C3AED]" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
