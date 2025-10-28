"use client"

import { useState } from "react"
import {
  Palette,
  MoonStar,
  Paintbrush,
  SquareStack,
  Sparkles,
  Minus,
  LayoutPanelLeft,
  History,
  Italic,
  IdCard,
  Columns3,
  Image,
} from "lucide-react"

const items = [
  { id: "classic", name: "Classic Glass", icon: Palette, bgClass: "bg-primary" },
  { id: "dark", name: "Dark Block", icon: MoonStar, bgClass: "bg-dark" },
  { id: "gradient", name: "Modern Gradient", icon: Paintbrush, bgClass: "bg-gradient" },
  { id: "compact", name: "Compact Pro", icon: SquareStack, bgClass: "bg-success" },
  { id: "creative", name: "Creative Cards", icon: Sparkles, bgClass: "bg-warning" },
  { id: "minimal", name: "Minimal White", icon: Minus, bgClass: "bg-secondary" },
  { id: "sidebar", name: "Accent Sidebar", icon: LayoutPanelLeft, bgClass: "bg-info" },
  { id: "timeline", name: "Timeline", icon: History, bgClass: "bg-danger" },
  { id: "serif", name: "Elegant Serif", icon: Italic, bgClass: "bg-teal" },
  { id: "europass", name: "Europass", icon: IdCard, bgClass: "bg-cyan" },
  { id: "split", name: "Split Pro", icon: Columns3, bgClass: "bg-pink" },
  { id: "banner", name: "Photo Banner", icon: Image, bgClass: "bg-purple" },
]

export default function TemplateSelector({ template = "classic", setTemplate = () => {} }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="position-relative">
      {/* Compact view - shows only active template */}
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-white bg-opacity-75 border shadow-sm animate-fade-in"
        >
          {(() => {
            const activeItem = items.find(it => it.id === template)
            const Icon = activeItem?.icon || Palette
            return (
              <>
                <div
                  className={`rounded-2 d-flex align-items-center justify-content-center ${activeItem?.bgClass} text-white`}
                  style={{ width: "16px", height: "16px" }}
                >
                  <Icon style={{ width: "12px", height: "12px" }} />
                </div>
                <span className="fw-medium small d-none d-sm-inline">{activeItem?.name}</span>
                <svg
                  className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ width: "16px", height: "16px" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )
          })()}
        </button>
      </div>

      {/* Expanded view - shows all templates */}
      {isExpanded && (
        <div
          className="position-absolute top-100 start-0 mt-2 bg-white bg-opacity-95 border rounded-4 shadow-lg p-4 animate-fade-in-up"
          style={{
            width: "320px",
            zIndex: 1050,
            maxHeight: "60vh", // ✅ Limit modal height
            overflowY: "auto", // ✅ Make it scrollable
          }}
        >
          <div className="row g-3">
            {items.map((it, index) => {
              const Icon = it.icon
              const active = template === it.id
              return (
                <div key={it.id} className="col-6">
                  <button
                    type="button"
                    onClick={() => {
                      setTemplate(it.id)
                      setIsExpanded(false)
                    }}
                    className={`card card-modern h-100 border-0 shadow-sm transition-all animate-fade-in ${
                      active ? "border-primary bg-primary bg-opacity-5" : "hover-shadow"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-pressed={active}
                    aria-label={`Select ${it.name} template`}
                    title={it.name}
                  >
                    <div className="card-body p-3 text-center">
                      <div
                        className={`rounded-3 d-flex align-items-center justify-content-center mx-auto mb-2 ${it.bgClass} text-white`}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <Icon style={{ width: "20px", height: "20px" }} />
                      </div>
                      <h6 className={`card-title mb-1 small fw-bold ${active ? "text-primary" : ""}`}>
                        {it.name}
                      </h6>
                      {active && (
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <div className="bg-primary rounded-circle animate-pulse" style={{ width: "8px", height: "8px" }}></div>
                          <small className="text-primary fw-medium">Active</small>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-3 pt-3 border-top">
            <p className="text-muted small text-center mb-0">Choose a template to preview your resume</p>
          </div>
        </div>
      )}

      {/* Backdrop to close expanded view */}
      {isExpanded && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.1)" }}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}
