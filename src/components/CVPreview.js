import { useState, useEffect, Suspense, lazy } from "react"

// Lazy load templates for better performance
const TemplateClassic = lazy(() => import("../templates/TemplateClassic"))
const TemplateDark = lazy(() => import("../templates/TemplateDark"))
const TemplateGradient = lazy(() => import("../templates/TemplateGradient"))
const TemplateCompact = lazy(() => import("../templates/TemplateCompact"))
const TemplateCreative = lazy(() => import("../templates/TemplateCreative"))
const TemplateMinimal = lazy(() => import("../templates/template-minimal"))
const TemplateSidebar = lazy(() => import("../templates/template-accent-sidebar"))
const TemplateTimeline = lazy(() => import("../templates/template-timeline"))
const TemplateSerif = lazy(() => import("../templates/template-serif"))
const TemplateEuropass = lazy(() => import("../templates/template-europass"))
const TemplateSplit = lazy(() => import("../templates/template-split"))
const TemplatePhotoBanner = lazy(() => import("../templates/template-photo-banner"))

export default function CVPreview({ formData = {}, template = "classic" }) {
  const [currentTemplate, setCurrentTemplate] = useState(template)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (template !== currentTemplate) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setCurrentTemplate(template)
        setIsTransitioning(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [template, currentTemplate])

  const renderTemplate = (templateName) => {
    const TemplateComponent = getTemplateComponent(templateName)
    return (
      <Suspense fallback={<SkeletonTemplate />}>
        <div className={`
          transition-all
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        `}>
          <TemplateComponent data={formData} />
        </div>
      </Suspense>
    )
  }

  return (
    <div className="position-relative w-100">
      {/* Template transition overlay */}
      {isTransitioning && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded-3"
             style={{zIndex: 10}}>
          <div className="d-flex align-items-center gap-3 text-muted">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="fw-medium small">Switching template...</span>
          </div>
        </div>
      )}

      {/* Template content */}
      <div className="position-relative" style={{zIndex: 0}}>
        {renderTemplate(currentTemplate)}
      </div>

      {/* Template info overlay */}
      <div className="position-absolute top-0 end-0 p-2 opacity-0 hover-opacity-100 transition-opacity">
        <div className="bg-white bg-opacity-75 border rounded-2 px-2 py-1 small text-muted">
          {getTemplateName(currentTemplate)}
        </div>
      </div>
    </div>
  )
}

function getTemplateComponent(templateName) {
  switch (templateName) {
    case "classic":
      return TemplateClassic
    case "dark":
      return TemplateDark
    case "gradient":
      return TemplateGradient
    case "compact":
      return TemplateCompact
    case "creative":
      return TemplateCreative
    case "minimal":
      return TemplateMinimal
    case "sidebar":
      return TemplateSidebar
    case "timeline":
      return TemplateTimeline
    case "serif":
      return TemplateSerif
    case "europass":
      return TemplateEuropass
    case "split":
      return TemplateSplit
    case "banner":
      return TemplatePhotoBanner
    default:
      return TemplateClassic
  }
}

function getTemplateName(templateName) {
  const names = {
    classic: "Classic Glass",
    dark: "Dark Block",
    gradient: "Modern Gradient",
    compact: "Compact Pro",
    creative: "Creative Cards",
    minimal: "Minimal White",
    sidebar: "Accent Sidebar",
    timeline: "Timeline",
    serif: "Elegant Serif",
    europass: "Europass",
    split: "Split Pro",
    banner: "Photo Banner"
  }
  return names[templateName] || "Unknown Template"
}

function SkeletonTemplate() {
  return (
    <div className="bg-white rounded-3 p-4 shadow-sm">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-light rounded-circle placeholder-glow" style={{width: "64px", height: "64px"}}></div>
        <div className="flex-grow-1">
          <div className="placeholder-glow mb-2">
            <div className="placeholder col-6"></div>
          </div>
          <div className="placeholder-glow">
            <div className="placeholder col-4"></div>
          </div>
        </div>
      </div>

      <div className="placeholder-glow mb-4">
        <div className="placeholder col-12" style={{height: "60px"}}></div>
      </div>

      <div className="placeholder-glow mb-3">
        <div className="placeholder col-4 mb-2"></div>
        <div className="placeholder col-8 mb-2"></div>
        <div className="placeholder col-6"></div>
      </div>

      <div className="placeholder-glow">
        <div className="placeholder col-5 mb-2"></div>
        <div className="placeholder col-9 mb-2"></div>
        <div className="placeholder col-7"></div>
      </div>
    </div>
  )
}
