const ChatUserItem = ({ user, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-[#1c2c5b] hover:bg-[#1c2c5b] ${
        isSelected ? 'bg-[#1f3a73]' : ''
      }`}
    >
      <img
        src={user?.photoURL || '/default-avatar.png'}
        className="w-10 h-10 rounded-full object-cover"
        alt="Avatar"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user?.name || user?.email}</span>
        <span className="text-xs text-gray-400 truncate">{user?.email}</span>
      </div>
    </div>
  );
};

export default ChatUserItem;