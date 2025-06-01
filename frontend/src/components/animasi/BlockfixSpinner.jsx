// src/components/animasi/BlockfixSpinner.jsx
import React from "react";
import logoImage from "../../assets/logo.png";

const BlockfixSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <img src={logoImage} alt="Blockfix Logo" className="w-20 h-20 animate-bounce" />
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default BlockfixSpinner;