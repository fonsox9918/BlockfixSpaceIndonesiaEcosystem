// src/components/auth/Input.jsx
import React from "react";

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-white text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default Input;