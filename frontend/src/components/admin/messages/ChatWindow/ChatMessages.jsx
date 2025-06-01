import React, { useRef, useEffect } from 'react';

const ChatMessages = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50">
      {messages.map((msg, index) => {
        const isMe = msg.senderId === currentUser.uid;
        return (
          <div
            key={index}
            className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm max-w-xs break-words ${
                isMe
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;