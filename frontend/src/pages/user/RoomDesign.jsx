import React from "react";
import ChatContainer from "../../components/roomdesign/ChatContainer";

const RoomDesign = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <header className="text-center font-bold text-2xl mb-4">
        Desain Ulang Ruanganmu dengan AI
      </header>
      <ChatContainer />
    </div>
  );
};

export default RoomDesign;
