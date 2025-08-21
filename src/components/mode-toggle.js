"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

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

  const toggle = () => {
    setTheme((t) => {
      if (t === "dark") return "light"
      const sysDark = getSystemPrefersDark()
      return t === "light" ? (sysDark ? "system" : "dark") : "dark"
    })
  }

  const icon = !mounted ? (
    <Sun className="h-5 w-5" />
  ) : theme === "dark" ? (
    <Sun className="h-5 w-5" />
  ) : (
    <Moon className="h-5 w-5" />
  )

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color mode"
      title="Toggle color mode"
      className="
        p-2 rounded-full 
        bg-gray-200 hover:bg-gray-300 
        dark:bg-gray-700 dark:hover:bg-gray-600 
        text-gray-800 dark:text-gray-200 
        shadow-md transition-colors
      "
    >
      {icon}
    </button>
  )
}
