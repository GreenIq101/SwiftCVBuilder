"use client"

import { useEffect } from "react"
import { Button } from "./ui/button"
import { X, Printer } from "lucide-react"
import CVPreview from "./CVPreview"

export default function FullscreenPreview({
  open = false,
  onClose = () => {},
  formData = {},
  template = "classic",
  onPrint = () => {},
}) {
  // lock scroll when open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Full-screen CV Preview">
      <div className="overlay-toolbar">
        <Button variant="outline" onClick={onClose} aria-label="Close full-screen preview">
          <X className="mr-2 h-4 w-4" />
          Close
        </Button>
        <Button onClick={onPrint} aria-label="Print or save as PDF">
          <Printer className="mr-2 h-4 w-4" />
          Print / PDF
        </Button>
      </div>

      <div className="overlay-content">
        <div className="overlay-surface">
          <CVPreview formData={formData} template={template} />
        </div>
      </div>
    </div>
  )
}
