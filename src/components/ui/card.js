import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(function Card({
  className,
  variant = "default",
  interactive = false,
  glow = false,
  ...props
}, ref) {
  const variants = {
    default: "bg-card text-card-foreground shadow-sm border",
    glass: "bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg border border-border/50",
    elevated: "bg-card text-card-foreground shadow-xl border border-border/20",
    gradient: "bg-gradient-to-br from-card to-card/80 text-card-foreground shadow-lg border border-border/30",
    outlined: "bg-transparent text-card-foreground border-2 border-dashed border-border/50",
    filled: "bg-primary/5 text-card-foreground border border-primary/20",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl transition-all duration-300 ease-out",
        interactive && "hover-lift cursor-pointer",
        glow && "animate-glow-pulse",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  )
})

const CardHeader = React.forwardRef(function CardHeader({
  className,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "flex flex-col space-y-1.5 p-6",
    compact: "flex flex-col space-y-1 p-4",
    spacious: "flex flex-col space-y-2 p-8",
  }

  return (
    <div
      ref={ref}
      className={cn(variants[variant] || variants.default, className)}
      {...props}
    />
  )
})

const CardTitle = React.forwardRef(function CardTitle({
  className,
  children,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "text-lg font-semibold leading-none tracking-tight",
    large: "text-xl font-bold leading-tight tracking-tight",
    small: "text-base font-medium leading-snug",
    gradient: "text-lg font-bold leading-none tracking-tight animate-gradient bg-clip-text text-transparent",
  }

  return (
    <h3
      ref={ref}
      className={cn(variants[variant] || variants.default, className)}
      aria-label={typeof children === "string" ? children : undefined}
      {...props}
    >
      {children}
    </h3>
  )
})

const CardDescription = React.forwardRef(function CardDescription({
  className,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "text-sm text-muted-foreground",
    subtle: "text-xs text-muted-foreground/80",
    prominent: "text-sm text-foreground/80 font-medium",
  }

  return (
    <p
      ref={ref}
      className={cn(variants[variant] || variants.default, className)}
      {...props}
    />
  )
})

const CardContent = React.forwardRef(function CardContent({
  className,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "p-6 pt-0",
    compact: "p-4 pt-0",
    spacious: "p-8 pt-0",
  }

  return (
    <div
      ref={ref}
      className={cn(variants[variant] || variants.default, className)}
      {...props}
    />
  )
})

const CardFooter = React.forwardRef(function CardFooter({
  className,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "flex items-center p-6 pt-0",
    compact: "flex items-center p-4 pt-0",
    spacious: "flex items-center p-8 pt-0",
    justified: "flex items-center justify-between p-6 pt-0",
  }

  return (
    <div
      ref={ref}
      className={cn(variants[variant] || variants.default, className)}
      {...props}
    />
  )
})

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
