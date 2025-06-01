// 5. Progress Bar
export function ProgressBar({ value, max = 100 }) {
  const percent = Math.min((value / max) * 100, 100)
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
