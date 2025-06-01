import React from 'react';
import ChatUserItem from './ChatUserItem';

const ChatUserList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <aside className="w-64 bg-[#0a142f] text-white overflow-y-auto border-r border-gray-700">
      <h2 className="p-4 text-lg font-semibold border-b border-gray-700">
        Daftar Pengguna
      </h2>
      <ul>
        {users.map((user) => (
          <ChatUserItem
            key={user.uid}
            user={user}
            isSelected={selectedUser?.uid === user.uid}
            onClick={() => onSelectUser(user)}
          />
        ))}
      </ul>
    </aside>
  );
};

export default ChatUserList;