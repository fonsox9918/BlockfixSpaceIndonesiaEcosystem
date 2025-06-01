// 6. Alert
export function Alert({ variant = 'info', children }) {
  const icons = {
    info: <Info className="w-4 h-4 text-blue-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    error: <XCircle className="w-4 h-4 text-red-600" />,
    success: <CheckCircle className="w-4 h-4 text-green-500" />
  }
  const bg = {
    info: 'bg-blue-50',
    warning: 'bg-yellow-50',
    error: 'bg-red-50',
    success: 'bg-green-50'
  }
  return (
    <div className={cn('flex items-start gap-2 p-3 rounded-lg border', bg[variant])}>
      {icons[variant]}
      <div className="text-sm text-foreground">{children}</div>
    </div>
  )
}
