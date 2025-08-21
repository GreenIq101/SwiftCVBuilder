"use client"

import { useEffect } from "react"

// Renders a fixed overlay that brightens under the cursor in dark mode.
// Uses CSS variables to position a radial gradient.
export default function CursorLight() {
  useEffect(() => {
    const handler = (e) => {
      document.documentElement.style.setProperty("--cursor-x", e.clientX + "px")
      document.documentElement.style.setProperty("--cursor-y", e.clientY + "px")
    }
    window.addEventListener("pointermove", handler, { passive: true })
    return () => window.removeEventListener("pointermove", handler)
  }, [])
  return <div className="cursor-light" aria-hidden="true" />
}
