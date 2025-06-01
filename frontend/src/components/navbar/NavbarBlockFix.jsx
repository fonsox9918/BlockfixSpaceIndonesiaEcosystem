// src/components/navbar/NavbarBlockFix.jsx
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import DesktopNav from "./DesktopNav";
import MobileNavUser from "./MobileNavUser";
import MobileNavGuest from "./MobileNavGuest";
import MobileBottomNav from "./MobileBottomNav";

const NavbarBlockFix = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <DesktopNav user={currentUser} pathname={pathname} />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {currentUser ? (
          <MobileNavUser user={currentUser} pathname={pathname} />
        ) : (
          <MobileNavGuest pathname={pathname} />
        )}
        {/* Tampilkan bottom nav hanya untuk user login */}
        {currentUser && <MobileBottomNav user={currentUser} pathname={pathname} />}
      </div>
    </>
  );
};

export default NavbarBlockFix;
