import React from "react";

const ChatBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-3 rounded-xl ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="preview"
            className="w-48 h-32 object-cover rounded mb-2"
          />
        )}
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
