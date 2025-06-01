const ChatHeader = ({ user }) => {
  return (
    <div className="px-4 py-3 bg-[#0f1e3a] border-b border-[#1c2c5b] flex items-center gap-3">
      <img
        src={user?.photoURL || '/default-avatar.png'}
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="text-sm font-semibold">{user?.name || 'User'}</div>
        <div className="text-xs text-gray-400">{user?.email}</div>
      </div>
    </div>
  );
};

export default ChatHeader;