import React from "react";
import { MessageCircle } from "lucide-react";

const sampleChats = [
  {
    name: "Admin Blockfix",
    lastMessage: "Silakan kirim desainnya ya kak.",
    time: "10:32",
    unread: true,
  },
  {
    name: "Tukang Budi",
    lastMessage: "Saya akan datang jam 9 pagi.",
    time: "08:15",
    unread: false,
  },
];

const ChatSection = () => {
  return (
    <div className="mt-6 bg-[#121C3B] p-4 rounded-xl shadow-md text-white">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" /> Pesan Terbaru
      </h2>
      <div className="space-y-4">
        {sampleChats.map((chat, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-white/10 pb-2"
          >
            <div>
              <p className="text-sm font-medium">{chat.name}</p>
              <p className="text-xs text-white/60 truncate max-w-xs">
                {chat.lastMessage}
              </p>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>{chat.time}</p>
              {chat.unread && (
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSection;