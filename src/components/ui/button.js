import * as React from "react"
import { cn } from "../../lib/utils"

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover-lift",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md hover-lift",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover-lift",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md hover-lift",
  ghost: "hover:bg-accent hover:text-accent-foreground hover-lift",
  link: "text-primary underline-offset-4 hover:underline",
  gradient: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover-lift btn-enhanced",
  glass: "bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/90 shadow-sm hover:shadow-md hover-lift",
  success: "bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-md hover-lift",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow-md hover-lift",
}

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3 text-sm",
  lg: "h-11 rounded-md px-8 text-base",
  xl: "h-12 rounded-lg px-10 text-lg",
  icon: "h-10 w-10",
  "icon-sm": "h-8 w-8",
  "icon-lg": "h-12 w-12",
}

const Button = React.forwardRef(function Button(
  {
    className = "",
    variant = "default",
    size = "default",
    asChild = false,
    animate = false,
    loading = false,
    ...props
  },
  ref,
) {
  const Comp = asChild ? "span" : "button"

  return (
    <Comp
      ref={ref}
      disabled={loading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-95",
        animate && "btn-enhanced",
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.default,
        className,
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {props.children}
    </Comp>
  )
})

export { Button }
