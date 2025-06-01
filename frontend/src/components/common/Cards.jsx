const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#121c3a] rounded-xl p-4 shadow-md text-white transition hover:shadow-lg cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;