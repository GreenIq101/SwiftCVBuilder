import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "../../lib/utils"

const Tabs = React.forwardRef(function Tabs({ className, variant = "default", ...props }, ref) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  )
})

const TabsList = React.forwardRef(function TabsList({
  className,
  variant = "default",
  size = "default",
  ...props
}, ref) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    outlined: "bg-transparent border border-border",
    filled: "bg-background border border-border",
    ghost: "bg-transparent",
    gradient: "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20",
  }

  const sizes = {
    default: "h-10 p-1",
    sm: "h-8 p-0.5",
    lg: "h-12 p-1.5",
  }

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200",
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className,
      )}
      {...props}
    />
  )
})

const TabsTrigger = React.forwardRef(function TabsTrigger({
  className,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
    pill: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full",
    underlined: "data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground rounded-none",
    ghost: "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex min-w-[80px] items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
        "ring-offset-background transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-accent/50 hover:text-accent-foreground",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    />
  )
})

const TabsContent = React.forwardRef(function TabsContent({
  className,
  variant = "default",
  ...props
}, ref) {
  const variants = {
    default: "",
    fade: "animate-in-fade",
    slide: "animate-in-slide-in-left",
  }

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "mt-4",
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    />
  )
})

export { Tabs, TabsList, TabsTrigger, TabsContent }
