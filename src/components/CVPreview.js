import TemplateClassic from "../templates/TemplateClassic"
import TemplateDark from "../templates/TemplateDark"
import TemplateGradient from "../templates/TemplateGradient"
import TemplateCompact from "../templates/TemplateCompact"
import TemplateCreative from "../templates/TemplateCreative"
import TemplateMinimal from "../templates/template-minimal"
import TemplateSidebar from "../templates/template-accent-sidebar"
import TemplateTimeline from "../templates/template-timeline"
import TemplateSerif from "../templates/template-serif"
import TemplateEuropass from "../templates/template-europass"
import TemplateSplit from "../templates/template-split"
import TemplatePhotoBanner from "../templates/template-photo-banner"

export default function CVPreview({ formData = {}, template = "classic" }) {
  switch (template) {
    case "classic":
      return <TemplateClassic data={formData} />
    case "dark":
      return <TemplateDark data={formData} />
    case "gradient":
      return <TemplateGradient data={formData} />
    case "compact":
      return <TemplateCompact data={formData} />
    case "creative":
      return <TemplateCreative data={formData} />
    case "minimal":
      return <TemplateMinimal data={formData} />
    case "sidebar":
      return <TemplateSidebar data={formData} />
    case "timeline":
      return <TemplateTimeline data={formData} />
    case "serif":
      return <TemplateSerif data={formData} />
    case "europass":
      return <TemplateEuropass data={formData} />
    case "split":
      return <TemplateSplit data={formData} />
    case "banner":
      return <TemplatePhotoBanner data={formData} />
    default:
      return <TemplateClassic data={formData} />
  }
}
