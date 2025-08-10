import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import logoImage from "../../assets/logo.png";

const LoginEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Cek apakah email sudah diverifikasi
      if (!user.emailVerified) {
        navigate(`/email-verification?email=${user.email}`);
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Akun tidak ditemukan.");
      }
    } catch (err) {
      console.error(err);
      setError("Email atau kata sandi salah.");
    }
    setLoading(false);
  };

  const handleLoginGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      
      // Coba popup terlebih dahulu
      try {
        const result = await signInWithPopup(auth, provider);
        await processGoogleUser(result.user);
      } catch (popupError) {
        console.log("Popup blocked, trying redirect:", popupError);
        
        // Jika popup diblokir, gunakan redirect
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/popup-closed-by-user' ||
            /Safari/.test(navigator.userAgent)) {
          await signInWithRedirect(auth, provider);
          return; // Redirect akan handle sisanya
        }
        throw popupError;
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Gagal masuk dengan Google: " + err.message);
    }
    setLoading(false);
  };

  const processGoogleUser = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create new user with default role
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user", // Default role
        isActive: true,
        address: "",
        phoneNumber: "",
        createdAt: serverTimestamp(),
        registerMethod: "google"
      });
      console.log("New user created in Firestore:", user.uid);
      navigate("/dashboard");
    } else {
      const userData = userSnap.data();
      console.log("Existing user found:", userData);
      
      // Navigate based on role
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <img src={logoImage} alt="Blockfix Logo" className="w-24 mb-8" />
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Masuk ke Akun Anda</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="space-y-3">
          <button
            onClick={handleLoginGoogle}
            className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
            disabled={loading}
          >
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google logo" />
            Lanjutkan dengan Google
          </button>

          <button
            disabled
            className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg opacity-50"
          >
            <img src="https://img.icons8.com/ios-filled/24/000000/phone.png" alt="Phone logo" />
            Lanjutkan dengan Telepon
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline no-underline">
            Daftar
          </Link>
        </div>

        <div className="flex justify-center space-x-4 text-xs text-gray-400 mt-8">
          <a href="#" className="hover:underline no-underline">Ketentuan Penggunaan</a>
          <span>|</span>
          <a href="#" className="hover:underline no-underline">Kebijakan Privasi</a>
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;