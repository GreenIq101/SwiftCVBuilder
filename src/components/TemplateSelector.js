"use client"

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
  BadgeIcon as IdCard,
  Columns3,
  Image,
} from "lucide-react"

const items = [
  { id: "classic", name: "Classic Glass", icon: Palette },
  { id: "dark", name: "Dark Block", icon: MoonStar },
  { id: "gradient", name: "Modern Gradient", icon: Paintbrush },
  { id: "compact", name: "Compact Pro", icon: SquareStack },
  { id: "creative", name: "Creative Cards", icon: Sparkles },
  { id: "minimal", name: "Minimal White", icon: Minus },
  { id: "sidebar", name: "Accent Sidebar", icon: LayoutPanelLeft },
  { id: "timeline", name: "Timeline", icon: History },
  { id: "serif", name: "Elegant Serif", icon: Italic },
  { id: "europass", name: "Europass", icon: IdCard },
  { id: "split", name: "Split Pro", icon: Columns3 },
  { id: "banner", name: "Photo Banner", icon: Image },
]

export default function TemplateSelector({ template = "classic", setTemplate = () => {} }) {
  return (
    <div className="template-chips">
      {items.map((it) => {
        const Icon = it.icon
        const active = template === it.id
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => setTemplate(it.id)}
            className={`template-chip ${active ? "is-active" : ""}`}
            aria-pressed={active}
            aria-label={`Select ${it.name} template`}
            title={it.name}
          >
            <span className="template-chip__icon">
              <Icon className="h-4 w-4" />
            </span>
            <span className="template-chip__label">{it.name}</span>
          </button>
        )
      })}
    </div>
  )
}
