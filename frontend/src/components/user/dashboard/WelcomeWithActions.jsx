import React, { useEffect, useState } from "react";
import WelcomeSection from "./WelcomeSection";
import ActionButtonsSection from "./ActionButtonsSection";

// Import gambar
import Bg1 from "../../../assets/images/Bg1.png";
import Bg2 from "../../../assets/images/Bg2.png";
import Bg3 from "../../../assets/images/Bg3.png";
import Bg4 from "../../../assets/images/Bg4.png";

const images = [Bg1, Bg2, Bg3, Bg4];

const WelcomeWithActions = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background image */}
      <img
        src={images[currentBg]}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ zIndex: 0 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-white text-center space-y-6">
        <WelcomeSection />
        <ActionButtonsSection />
      </div>
    </div>
  );
};

export default WelcomeWithActions;