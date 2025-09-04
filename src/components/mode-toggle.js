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
        btn btn-outline-secondary position-relative p-2 rounded-3 border
        bg-white bg-opacity-75 shadow-sm
        transition-all
        hover-shadow hover-scale
        focus-visible-ring
        ${isAnimating ? 'animate-pulse' : ''}
      `}
    >
      <div className={`
        transition-transform
        ${isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
      `}>
        {getIcon()}
      </div>

      {/* Subtle glow effect on hover */}
      <div className="
        position-absolute top-0 start-0 w-100 h-100 rounded-3 opacity-0
        bg-gradient-to-br from-primary/10 via-transparent to-accent/10
        transition-opacity
        hover-opacity-100
        pointer-events-none
      " />
    </button>
  )
}
