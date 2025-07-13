import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import logoImage from "../../assets/logo.png";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isStrongPassword = (password) =>
  password.length >= 6;

const InputField = ({ type, value, onChange, placeholder }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 rounded-lg border border-gray-300"
    required
  />
);

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Catatan penting: 
  // Firebase Authentication otomatis mengelola user, tapi untuk "belum verified" 
  // biasanya kamu tidak langsung simpan user ini ke database internal (misal Firestore atau Supabase).
  // Jadi, proses simpan data user ke database internal harus kamu lakukan di halaman CompleteRegistration
  // hanya setelah email verified. Ini menjaga database internal kamu bersih dari user belum verified.

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) return setError("Format email tidak valid.");
    if (!isStrongPassword(password)) return setError("Password minimal 6 karakter.");
    if (password !== confirmPassword) return setError("Konfirmasi password tidak cocok.");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user);
      // Setelah register, langsung arahkan ke halaman verifikasi email dengan email sebagai query param
      navigate(`/email-verification?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      setError("Email sudah terdaftar atau terjadi kesalahan.");
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Google login otomatis verified, langsung ke CompleteRegistration
      if (user.emailVerified || user.providerData.some(p => p.providerId === "google.com")) {
        navigate("/complete-registration");
      } else {
        // Ini jarang terjadi, tapi kalau belum verified, kirim ulang email dan arahkan ke halaman verifikasi
        await sendEmailVerification(user);
        navigate(`/email-verification?email=${encodeURIComponent(user.email)}`);
      }
    } catch (err) {
      console.error(err);
      setError("Gagal daftar dengan Google.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <img src={logoImage} alt="Blockfix Logo" className="w-24 mb-8" />
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Buat Akun</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Alamat Email"
          />
          <div className="relative">
            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
            >
              {showPassword ? "Sembunyikan" : "Lihat"}
            </button>
          </div>
          <InputField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi Password"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            Daftar & Verifikasi Email
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-500 text-sm">atau daftar dengan</span>
        </div>
        <button
          onClick={handleGoogleRegister}
          className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
          Lanjutkan dengan Google
        </button>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Anda sudah punya akun blockfix?{" "}
          <Link to="/login-email" className="text-blue-600 hover:underline no-underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;