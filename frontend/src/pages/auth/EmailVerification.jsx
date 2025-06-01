import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);

  const email = searchParams.get("email");

  // Cek apakah user sudah logout / belum login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login-email");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCheckVerification = async () => {
    setChecking(true);
    setMessage("");

    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        setMessage("Email berhasil diverifikasi! Mengarahkan ke dashboard...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage("Email Anda belum terverifikasi. Coba lagi setelah klik link di email.");
      }
    } catch (error) {
      setMessage("Gagal memeriksa status verifikasi.");
      console.error(error);
    }
    setChecking(false);
  };

  const handleBackToLogin = async () => {
    await signOut(auth);
    navigate("/login-email");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold">Verifikasi Email</h2>
        <p className="text-gray-600">
          Kami telah mengirimkan email verifikasi ke:
          <br />
          <strong>{email}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Silakan klik link verifikasi di email Anda, lalu tekan tombol di bawah untuk melanjutkan.
        </p>

        {message && <p className="text-red-500">{message}</p>}

        <button
          onClick={handleCheckVerification}
          disabled={checking}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
        >
          {checking ? "Memeriksa..." : "Saya sudah verifikasi"}
        </button>

        <button
          onClick={handleBackToLogin}
          className="w-full mt-2 text-sm text-gray-500 hover:underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;