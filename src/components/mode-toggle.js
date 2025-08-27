"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Monitor } from "lucide-react"

const STORAGE_KEY = "theme"

function getSystemPrefersDark() {
  if (typeof window === "undefined") return false
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyThemeClass(nextTheme) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (nextTheme === "dark") root.classList.add("dark")
  else root.classList.remove("dark")
}

export default function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState("system")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const initial = saved || "system"
      setTheme(initial)
      const effective = initial === "dark" || (initial === "system" && getSystemPrefersDark()) ? "dark" : "light"
      applyThemeClass(effective)
    } catch {}
  }, [])

  useEffect(() => {
    if (!mounted) return
    const effective = theme === "dark" || (theme === "system" && getSystemPrefersDark()) ? "dark" : "light"
    applyThemeClass(effective)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }, [theme, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        const effective = getSystemPrefersDark() ? "dark" : "light"
        applyThemeClass(effective)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, mounted])

  const toggle = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    setTheme((t) => {
      if (t === "light") return "dark"
      if (t === "dark") return "system"
      return "light"
    })
  }

  const getIcon = () => {
    if (!mounted) return <Sun className="h-4 w-4" />

    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  const getLabel = () => {
    if (!mounted) return "Toggle theme"
    switch (theme) {
      case "dark":
        return "Switch to light mode"
      case "system":
        return "Switch to dark mode"
      default:
        return "Switch to system mode"
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={getLabel()}
      title={getLabel()}
      className={`
        relative p-2 rounded-xl
        bg-background/80 backdrop-blur-sm border border-border/50
        hover:bg-accent/10 hover:border-border
        text-foreground/80 hover:text-foreground
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${isAnimating ? 'animate-pulse' : ''}
      `}
    >
      <div className={`
        relative transition-transform duration-300 ease-out
        ${isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
      `}>
        {getIcon()}
      </div>

      {/* Subtle glow effect on hover */}
      <div className="
        absolute inset-0 rounded-xl opacity-0
        bg-gradient-to-br from-primary/10 via-transparent to-accent/10
        transition-opacity duration-300
        hover:opacity-100
        pointer-events-none
      " />
    </button>
  )
}
