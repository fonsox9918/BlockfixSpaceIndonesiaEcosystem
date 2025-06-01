// src/pages/auth/LoginSurveyor.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LoginSurveyor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        throw new Error('Akun tidak ditemukan di database.');
      }

      const userData = userDoc.data();
      if (userData.role !== 'surveyor') {
        await signOut(auth);
        throw new Error('Akun ini bukan untuk tim survey.');
      }

      navigate('/surveyor/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a142f] text-white">
      <form onSubmit={handleLogin} className="bg-[#111c3b] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login Tim Survey</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-[#0a142f] text-white border border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-[#0a142f] text-white border border-gray-600"
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-black font-bold py-2 rounded"
        >
          Masuk sebagai Tim Survey
        </button>
      </form>
    </div>
  );
};

export default LoginSurveyor;