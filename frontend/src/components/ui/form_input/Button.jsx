import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = {
  default: 'bg-primary text-white hover:bg-violet-700',
  secondary: 'bg-secondary text-primary hover:bg-violet-200',
  destructive: 'bg-destructive text-white hover:bg-red-700',
  outline: 'border border-border text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',

  // Untuk dark mode adaptif, tailwind akan menyesuaikan otomatis dengan `dark:` prefix.
}

const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10 p-0'
}

export const Button = forwardRef(
  (
    {
      className,
      children,
      variant = 'default',
      size = 'md',
      isLoading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

//Catatan:
//Gunakan variant prop seperti: variant="secondary" atau variant="destructive"
//Gunakan loading={true} untuk loading state
//Gunakan disabled untuk menonaktifkan tombol
//Utility cn gabungkan className (bisa pakai clsx kalau tidak ada utils)
