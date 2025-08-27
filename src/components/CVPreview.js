import { useState, useEffect, Suspense, lazy } from "react"
import { SkeletonTemplate } from "./ui/skeleton"

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
          transition-all duration-300 ease-out
          ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          <TemplateComponent data={formData} />
        </div>
      </Suspense>
    )
  }

  return (
    <div className="relative w-full">
      {/* Template transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Switching template...</span>
          </div>
        </div>
      )}

      {/* Template content */}
      <div className="relative z-0">
        {renderTemplate(currentTemplate)}
      </div>

      {/* Template info overlay */}
      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-md px-2 py-1 text-xs text-muted-foreground">
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
