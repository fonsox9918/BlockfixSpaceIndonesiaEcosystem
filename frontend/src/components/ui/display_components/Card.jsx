import React from 'react'
import { cn } from '@/lib/utils'
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react'

// 1. Card
export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-foreground shadow-sm p-4 transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}