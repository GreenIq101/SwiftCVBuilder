"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { X, Type, Palette, AlignJustify, CornerDownLeft, RotateCcw } from "lucide-react"

export default function CustomizationPanel({
  open = false,
  onClose = () => {},
  customizations = {},
  setCustomizations = () => {},
}) {

  if (!open) return null

  const fontOptions = [
    { value: 'Inter', label: 'Inter', family: 'Inter, sans-serif' },
    { value: 'Roboto', label: 'Roboto', family: 'Roboto, sans-serif' },
    { value: 'Open Sans', label: 'Open Sans', family: 'Open Sans, sans-serif' },
    { value: 'Lato', label: 'Lato', family: 'Lato, sans-serif' },
    { value: 'Poppins', label: 'Poppins', family: 'Poppins, sans-serif' },
    { value: 'Playfair Display', label: 'Playfair Display', family: 'Playfair Display, serif' },
  ]

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ]

  const spacingOptions = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'relaxed', label: 'Relaxed' },
  ]

  const borderRadiusOptions = [
    { value: 'none', label: 'Sharp' },
    { value: 'small', label: 'Subtle' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Rounded' },
  ]

  const handleReset = () => {
    setCustomizations({
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 'normal',
      primaryColor: '#3b82f6',
      accentColor: '#fbbf24',
      borderRadius: 'medium'
    })
  }

  return (
    <div className="fullscreen-overlay animate-in-fade">
      <div className="fullscreen-toolbar">
        <div className="toolbar-left">
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close customization panel"
            className="btn-enhanced"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="toolbar-center">
          <h2 className="text-lg font-semibold">Customize Your CV</h2>
        </div>

        <div className="toolbar-right">
          <Button
            variant="ghost"
            onClick={handleReset}
            aria-label="Reset to defaults"
            className="btn-enhanced"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="fullscreen-content">
        <div className="customization-grid animate-in-scale">
          {/* Typography Section */}
          <Card className="customization-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <Type className="h-5 w-5 text-primary" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Font Family</label>
                <div className="grid grid-cols-2 gap-2">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => setCustomizations({ ...customizations, fontFamily: font.value })}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        customizations.fontFamily === font.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ fontFamily: font.family }}
                    >
                      <div className="font-medium">{font.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">Aa Bb Cc</div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-3 block">Font Size</label>
                <div className="flex gap-2">
                  {fontSizeOptions.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setCustomizations({ ...customizations, fontSize: size.value })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        customizations.fontSize === size.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Colors Section */}
          <Card className="customization-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <Palette className="h-5 w-5 text-primary" />
                Colors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customizations.primaryColor}
                    onChange={(e) => setCustomizations({ ...customizations, primaryColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customizations.primaryColor}
                    onChange={(e) => setCustomizations({ ...customizations, primaryColor: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-3 block">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customizations.accentColor}
                    onChange={(e) => setCustomizations({ ...customizations, accentColor: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customizations.accentColor}
                    onChange={(e) => setCustomizations({ ...customizations, accentColor: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="#fbbf24"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layout Section */}
          <Card className="customization-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <AlignJustify className="h-5 w-5 text-primary" />
                Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Spacing</label>
                <div className="flex gap-2">
                  {spacingOptions.map((spacing) => (
                    <button
                      key={spacing.value}
                      onClick={() => setCustomizations({ ...customizations, spacing: spacing.value })}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        customizations.spacing === spacing.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {spacing.label}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-3 block">Border Radius</label>
                <div className="grid grid-cols-2 gap-2">
                  {borderRadiusOptions.map((radius) => (
                    <button
                      key={radius.value}
                      onClick={() => setCustomizations({ ...customizations, borderRadius: radius.value })}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        customizations.borderRadius === radius.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 bg-primary ${
                        radius.value === 'none' ? 'rounded-none' :
                        radius.value === 'small' ? 'rounded-sm' :
                        radius.value === 'medium' ? 'rounded' :
                        'rounded-lg'
                      }`}></div>
                      {radius.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="customization-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-heading-md">
                <CornerDownLeft className="h-5 w-5 text-primary" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="preview-sample p-6 rounded-lg border bg-card"
                style={{
                  fontFamily: fontOptions.find(f => f.value === customizations.fontFamily)?.family || 'Inter, sans-serif',
                  fontSize: customizations.fontSize === 'small' ? '14px' : customizations.fontSize === 'large' ? '18px' : '16px',
                  lineHeight: customizations.spacing === 'compact' ? '1.4' : customizations.spacing === 'relaxed' ? '1.8' : '1.6',
                  borderRadius: customizations.borderRadius === 'none' ? '0' :
                               customizations.borderRadius === 'small' ? '4px' :
                               customizations.borderRadius === 'large' ? '12px' : '8px'
                }}
              >
                <h3
                  className="font-bold mb-2"
                  style={{ color: customizations.primaryColor }}
                >
                  John Doe
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  john@example.com • +1 234 567 8900
                </p>
                <p className="mb-4">
                  Experienced software developer with a passion for creating innovative solutions.
                </p>
                <div className="space-y-2">
                  <h4
                    className="font-semibold"
                    style={{ color: customizations.primaryColor }}
                  >
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: customizations.accentColor + '20',
                        color: customizations.accentColor
                      }}
                    >
                      React
                    </span>
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: customizations.accentColor + '20',
                        color: customizations.accentColor
                      }}
                    >
                      JavaScript
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}