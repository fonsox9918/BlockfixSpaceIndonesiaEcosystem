import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  const sendToBackend = async (message) => {
    try {
      const res = await fetch("http://localhost:5000/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: message.text,
          image: message.image,
          sender: message.sender,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.reply) {
          setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
        }
      } else {
        console.error("Backend error:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
    sendToBackend(message);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white rounded-lg shadow">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            Mulai desain dengan ketik pesan atau upload gambar...
          </p>
        )}
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
      </div>

      {/* Chat input area */}
      <div className="border-t p-4 bg-gray-50 rounded-b-lg shadow-inner">
        <ChatInput onSend={addMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
