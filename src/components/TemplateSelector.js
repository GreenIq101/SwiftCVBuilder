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
  BadgeIcon as IdCard,
  Columns3,
  Image,
} from "lucide-react"

const items = [
  { id: "classic", name: "Classic Glass", icon: Palette, color: "from-blue-500 to-blue-600" },
  { id: "dark", name: "Dark Block", icon: MoonStar, color: "from-gray-800 to-gray-900" },
  { id: "gradient", name: "Modern Gradient", icon: Paintbrush, color: "from-purple-500 to-pink-500" },
  { id: "compact", name: "Compact Pro", icon: SquareStack, color: "from-green-500 to-green-600" },
  { id: "creative", name: "Creative Cards", icon: Sparkles, color: "from-yellow-500 to-orange-500" },
  { id: "minimal", name: "Minimal White", icon: Minus, color: "from-gray-500 to-gray-600" },
  { id: "sidebar", name: "Accent Sidebar", icon: LayoutPanelLeft, color: "from-indigo-500 to-indigo-600" },
  { id: "timeline", name: "Timeline", icon: History, color: "from-red-500 to-red-600" },
  { id: "serif", name: "Elegant Serif", icon: Italic, color: "from-teal-500 to-teal-600" },
  { id: "europass", name: "Europass", icon: IdCard, color: "from-cyan-500 to-cyan-600" },
  { id: "split", name: "Split Pro", icon: Columns3, color: "from-pink-500 to-pink-600" },
  { id: "banner", name: "Photo Banner", icon: Image, color: "from-violet-500 to-violet-600" },
]

export default function TemplateSelector({ template = "classic", setTemplate = () => {} }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      {/* Compact view - shows only active template */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-200 hover-lift"
        >
          {(() => {
            const activeItem = items.find(it => it.id === template)
            const Icon = activeItem?.icon || Palette
            return (
              <>
                <div className={`w-4 h-4 rounded bg-gradient-to-br ${activeItem?.color} flex items-center justify-center`}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">{activeItem?.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
        <div className="absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-xl p-4 z-50 animate-in-scale">
          <div className="grid grid-cols-2 gap-3">
            {items.map((it, index) => {
              const Icon = it.icon
              const active = template === it.id
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    setTemplate(it.id)
                    setIsExpanded(false)
                  }}
                  className={`
                    group relative p-3 rounded-lg border transition-all duration-200 hover-lift
                    ${active
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-accent/5'
                    }
                    animate-in-up
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-pressed={active}
                  aria-label={`Select ${it.name} template`}
                  title={it.name}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-lg bg-gradient-to-br ${it.color}
                      flex items-center justify-center shadow-sm
                      group-hover:scale-110 transition-transform duration-200
                    `}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium text-sm ${active ? 'text-primary' : 'text-foreground'}`}>
                        {it.name}
                      </div>
                      {active && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <span className="text-xs text-primary font-medium">Active</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                </button>
              )
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Choose a template to preview your resume
            </p>
          </div>
        </div>
      )}

      {/* Backdrop to close expanded view */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}
