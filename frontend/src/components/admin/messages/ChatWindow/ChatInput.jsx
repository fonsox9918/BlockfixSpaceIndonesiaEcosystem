import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-3 border-t border-gray-200 bg-white">
      <input
        type="text"
        placeholder="Ketik pesan..."
        className="text-black flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="text-bold ml-3 px-4 py-2 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        Kirim
      </button>
    </div>
  );
};

export default ChatInput;