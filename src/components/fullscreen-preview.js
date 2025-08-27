"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { X, Printer, Download, Share2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import CVPreview from "./CVPreview"

export default function FullscreenPreview({
  open = false,
  onClose = () => {},
  formData = {},
  template = "classic",
  onPrint = () => {},
}) {
  const [zoom, setZoom] = useState(100)
  const [isAnimating, setIsAnimating] = useState(false)

  // lock scroll when open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    setIsAnimating(true)
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50))
  const handleResetZoom = () => setZoom(100)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${formData.name || 'My CV'} - SwiftCV Builder`,
          text: 'Check out my professional CV created with SwiftCV Builder',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!open) return null

  return (
    <div
      className={`fullscreen-overlay ${isAnimating ? 'animate-in-fade' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen CV Preview"
    >
      {/* Enhanced toolbar with more options */}
      <div className="fullscreen-toolbar">
        <div className="toolbar-left">
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close full-screen preview"
            className="btn-enhanced"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="toolbar-center">
          <div className="zoom-controls">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="zoom-level">{zoom}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetZoom}
              aria-label="Reset zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="toolbar-right">
          <Button
            variant="ghost"
            onClick={handleShare}
            aria-label="Share CV"
            className="btn-enhanced"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            onClick={onPrint}
            aria-label="Print or save as PDF"
            className="btn-enhanced primary-btn"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print / PDF
          </Button>
        </div>
      </div>

      {/* Enhanced content area with zoom support */}
      <div className="fullscreen-content">
        <div
          className="fullscreen-surface animate-in-scale"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center'
          }}
        >
          <CVPreview formData={formData} template={template} />
        </div>
      </div>

      {/* Zoom indicator */}
      {zoom !== 100 && (
        <div className="zoom-indicator">
          Zoom: {zoom}%
        </div>
      )}
    </div>
  )
}
