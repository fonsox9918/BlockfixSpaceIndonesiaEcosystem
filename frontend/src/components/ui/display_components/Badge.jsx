// 3. Badge
export function Badge({ children, className }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground', className)}>
      {children}
    </span>
  )
}