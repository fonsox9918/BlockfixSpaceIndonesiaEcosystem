export function Tooltip({ children, text }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
        {text}
      </div>
    </div>
  )
}
