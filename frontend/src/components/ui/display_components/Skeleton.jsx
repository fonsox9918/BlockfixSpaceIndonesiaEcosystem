// 7. Skeleton
export function Skeleton({ className }) {
  return (
    <div className={cn('animate-pulse bg-muted rounded-md', className)} />
  )
}
