import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(function Input({
  className,
  type = "text",
  variant = "default",
  size = "default",
  label,
  error,
  success,
  loading,
  icon,
  ...props
}, ref) {
  const variants = {
    default: "border-input bg-background focus-visible:ring-ring",
    filled: "border-transparent bg-muted focus-visible:bg-background focus-visible:border-input",
    outlined: "border-2 border-input bg-transparent focus-visible:border-primary",
    ghost: "border-transparent bg-transparent hover:bg-muted focus-visible:bg-muted",
    gradient: "border-transparent bg-gradient-to-r from-primary/10 to-accent/10 focus-visible:from-primary/20 focus-visible:to-accent/20",
  }

  const sizes = {
    default: "h-10 px-3 py-2 text-sm",
    sm: "h-8 px-2 py-1 text-xs",
    lg: "h-12 px-4 py-3 text-base",
  }

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
            {icon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex w-full rounded-lg transition-all duration-200 ease-out",
            "ring-offset-background placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            error && "border-destructive focus-visible:ring-destructive",
            success && "border-green-500 focus-visible:ring-green-500",
            loading && "opacity-70 cursor-wait",
            variants[variant] || variants.default,
            sizes[size] || sizes.default,
            className,
          )}
          ref={ref}
          {...props}
        />

        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {success && !loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

export { Input }
