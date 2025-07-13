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
    <div className="mt-6 lg:mt-8 bg-white border border-gray-200 p-6 lg:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <MessageCircle className="w-7 h-7 text-[#7C3AED]" /> 
          Pesan Terbaru
        </h2>
        <button className="text-[#7C3AED] hover:text-[#6D28D9] font-medium text-sm">
          Lihat Semua
        </button>
      </div>
      
      {sampleChats.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Belum ada pesan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sampleChats.map((chat, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#4FACFE] rounded-full flex items-center justify-center text-white font-semibold">
                  {chat.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-1">{chat.name}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <p className="text-xs text-gray-500">{chat.time}</p>
                {chat.unread && (
                  <span className="inline-block w-3 h-3 rounded-full bg-[#7C3AED]" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSection;