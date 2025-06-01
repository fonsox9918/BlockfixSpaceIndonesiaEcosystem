import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png";

const taglines = [
  "Jasa Interior Dinding dan Plafond Modern",
  "Design Interior Dindingmu dalam hitungan detik",
  "Home Smart Device dengan fitur canggih",
];

const Auth = () => {
  const navigate = useNavigate();
  const [currentTagline, setCurrentTagline] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < taglines[taglineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentTagline((prev) => prev + taglines[taglineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setCharIndex(0);
        setCurrentTagline("");
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      }, 2000);
      return () => clearTimeout(pause);
    }
  }, [charIndex, taglineIndex]);

  return (
    <div className="min-h-screen bg-dark flex flex-col justify-center items-center px-6 font-poppins text-lightText">
      {/* Logo */}
      <img src={logoImage} alt="Blockfix Logo" className="w-20 mb-8" />

      {/* Animasi Tagline */}
      <div className="text-center mb-10 min-h-[70px]">
        <h1 className="text-2xl font-bold text-primary">{currentTagline}</h1>
      </div>

      {/* Card login */}
      <div className="bg-cardBg border border-cardBorder w-full max-w-md rounded-3xl shadow-card p-8 space-y-6 backdrop-blur-md">
        <button
          onClick={() => navigate("/login-email")}
          className="w-full py-3 bg-primary hover:bg-secondary text-dark font-semibold rounded-full transition duration-300"
        >
          Masuk dengan Email
        </button>

        <button
          onClick={() => alert('Login Wallet belum tersedia')}
          className="w-full py-3 bg-secondary hover:bg-primary text-dark font-semibold rounded-full transition duration-300"
        >
          Masuk dengan Wallet
        </button>

        <div className="border-t border-cardBorder my-6"></div>

        <p className="text-center text-lightText text-sm">
          Belum punya akun?{" "}
          <a href="/register" className="text-primary hover:text-secondary font-semibold transition">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;