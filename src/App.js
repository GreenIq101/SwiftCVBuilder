"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Separator } from "./components/ui/separator"
import { Download, FileDown, Printer, List, Palette, Target } from "lucide-react"
import CVForm from "./components/CVForm"
import CVPreview from "./components/CVPreview"
import TemplateSelector from "./components/TemplateSelector"
import ModeToggle from "./components/mode-toggle"
import { useToast, Toaster } from "./hooks/use-toast"
import FullscreenPreview from "./components/fullscreen-preview"
import CursorLight from "./components/cursor-light"
import AuthScreen from "./components/auth-screen"
import UserMenu from "./components/user-menu"
import CVManager from "./components/cv-manager"
import { useAuth } from "./hooks/use-auth"
import LandingPage from "./components/landing-page"
import CustomizationPanel from "./components/customization-panel"
import ExportPDF from "./components/ExportPDF"
import ResumeScorer from "./components/resume-scorer"
import { LOGO_PATH } from "./constants"

const LOCAL_KEY = "cv_builder_form_v3"
const TEMPLATE_KEY = "cv_builder_template_v3"

const defaultForm = {
  photo: "",
  name: "",
  email: "",
  phone: "",
  summary: "",
  education: [{ level: "", organization: "", startDate: "", endDate: "" }],
  experiences: [{ title: "", company: "", duration: "", description: "" }],
  projects: [{ name: "", description: "", link: "" }],
  skills: "",
  hobbies: "",
}

export default function App() {
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState(defaultForm)
  const [template, setTemplate] = useState("classic")
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [showManager, setShowManager] = useState(false)
  const [currentResumeId, setCurrentResumeId] = useState(null)

  const handleTemplateChange = (newTemplate) => {
    setTemplate(newTemplate)
  }
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showScorer, setShowScorer] = useState(false)
  const [customizations, setCustomizations] = useState({
    fontFamily: 'Inter',
    fontSize: 'medium',
    spacing: 'normal',
    primaryColor: '#3b82f6',
    accentColor: '#fbbf24',
    borderRadius: 'medium'
  })

  // Load persisted data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_KEY)
      const savedTemplate = localStorage.getItem(TEMPLATE_KEY)
      if (saved) setFormData(JSON.parse(saved))
      if (savedTemplate) setTemplate(savedTemplate)
    } catch {}
  }, [])

  // Debounced persist
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(formData))
      } catch {}
    }, 300)
    return () => clearTimeout(id)
  }, [formData])

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, template)
    } catch {}
  }, [template])


  const isValid = useMemo(() => {
    const hasName = (formData.name || "").trim().length > 0
    const hasEmail = /\S+@\S+\.\S+/.test(formData.email || "")
    const hasPhone = (formData.phone || "").trim().length >= 7
    return hasName && hasEmail && hasPhone
  }, [formData])

  // Print only the CV area
  const printOnlyCV = () => {
    const preview = document.getElementById("preview")
    if (!preview) return
    const printWindow = window.open("", "_blank", "width=1200,height=800")
    if (!printWindow) return
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((n) => n.outerHTML)
      .join("\n")
    const isDark = document.documentElement.classList.contains("dark")

    const html = `<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>CV</title>${styles}
<style>
  body{margin:0;background:#fff}
  #print-root{padding:0}
  @page{size:A4;margin:12mm}
  @media print{.print\\:border-0{border:0!important}.print\\:p-0{padding:0!important}}
</style>
</head>
<body class="${isDark ? "dark" : ""}">
  <div id="print-root">${preview.innerHTML}</div>
  <script>window.onload=()=>setTimeout(()=>{window.print();window.close()},50)</script>
</body></html>`
    printWindow.document.open()
    printWindow.document.write(html)
    printWindow.document.close()
  }

  const onPrint = () => printOnlyCV()


  const onExportJSON = () => {
    try {
      const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "cv-data.json"
      a.click()
      URL.revokeObjectURL(url)
      toast({ title: "Exported", description: "Your data has been exported as JSON." })
    } catch {
      toast({ title: "Export failed", description: "Could not export your data." })
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 animate-in-fade">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-muted/60 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Loading Animation */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto animation-delay-300"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Loading SwiftCV Builder</h2>
            <p className="text-muted-foreground animate-pulse">Preparing your workspace...</p>
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
            <div className="space-y-3">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-32 bg-muted/50 rounded-lg animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
              <div className="h-32 bg-muted/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show LandingPage if user is not signed in
  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="page-shell keyboard-navigation">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Toaster />
      <CursorLight />

      {/* Modern Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-brand">
            <img src={LOGO_PATH} alt="SwiftCV Logo" className="header-logo" />
            <span className="header-title hidden sm:inline">SwiftCV Builder</span>
            <span className="header-title sm:hidden">SwiftCV</span>
          </div>

          <div className="header-actions">
            {/* Desktop Layout */}
            <div className="hidden md:flex header-stats">
              <div className="stat-badge">
                <span className="stat-label hidden lg:inline">Template:</span>
                <TemplateSelector template={template} setTemplate={handleTemplateChange} />
              </div>
              <div className={`status-indicator ${isValid ? 'valid' : 'invalid'}`}>
                <div className="status-dot"></div>
                <span className="hidden sm:inline">{isValid ? 'Ready' : 'Incomplete'}</span>
                <span className="sm:hidden">{isValid ? '✓' : '!'}</span>
              </div>
            </div>

            <div className="header-buttons">
              {/* Desktop Buttons */}
              <div className="hidden sm:flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomizer(true)}
                  className="header-btn"
                  size="sm"
                >
                  <Palette className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline">Customize</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowScorer(true)}
                  className="header-btn"
                  size="sm"
                >
                  <Target className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline">Score CV</span>
                </Button>

                <Button
                  onClick={() => setShowExport(true)}
                  disabled={!isValid}
                  className="header-btn primary"
                  size="sm"
                >
                  <Download className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline">Export</span>
                </Button>
              </div>

              {/* Mobile Template Selector */}
              <div className="md:hidden">
                <TemplateSelector template={template} setTemplate={handleTemplateChange} />
              </div>

              {user ? (
                <UserMenu user={user} onOpenManager={() => setShowManager(true)} />
              ) : (
                <Button variant="outline" onClick={() => setShowManager(true)} className="header-btn" size="sm">
                  <List className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Sign in</span>
                </Button>
              )}

              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Action Bar */}
        <div className="sm:hidden mobile-action-bar">
          <Button
            variant="outline"
            onClick={() => setShowCustomizer(true)}
            className="mobile-action-btn"
            size="sm"
          >
            <Palette className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowScorer(true)}
            className="mobile-action-btn"
            size="sm"
          >
            <Target className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => setShowExport(true)}
            disabled={!isValid}
            className="mobile-action-btn primary"
            size="sm"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* If not signed in and manager requested, show auth UI inside manager overlay */}
      {!user && showManager ? (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Sign In">
          <div className="overlay-toolbar">
            <Button variant="outline" onClick={() => setShowManager(false)}>
              Close
            </Button>
          </div>
          <div className="overlay-content">
            <div className="overlay-surface" style={{ maxWidth: 720 }}>
              <AuthScreen />
            </div>
          </div>
        </div>
      ) : null}

      {/* Manager overlay for signed-in users */}
      {user ? (
        <CVManager
          open={showManager}
          onClose={() => setShowManager(false)}
          user={user}
          currentResumeId={currentResumeId}
          setCurrentResumeId={setCurrentResumeId}
          formData={formData}
          template={template}
          setFormData={setFormData}
          setTemplate={setTemplate}
        />
      ) : null}

      {/* Main content */}
      <main id="main-content" className="container space-y-4 md:space-y-6 animate-in-fade">
        {/* Mobile: Preview First, Form Second */}
        <div className="block md:hidden space-y-4">
          {/* Mobile Preview */}
          <Card className="overflow-hidden elevated hover-raise animate-in-up">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  Preview
                </CardTitle>
                <div className="flex items-center gap-1" role="status" aria-live="polite">
                  {isValid ? (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Ready
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      Incomplete
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div id="preview" className="preview-surface glow-surface rounded-lg overflow-hidden relative">
                <div className="animate-in-scale scale-90 origin-top">
                  <CVPreview formData={formData} template={template} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Form */}
          <Card className="print:hidden elevated hover-raise animate-in-up animate-delay-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Edit Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-3 h-auto">
                  <TabsTrigger value="profile" className="text-xs py-2">Profile</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs py-2">Education</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs py-2">Experience</TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-3 mb-4 h-auto">
                  <TabsTrigger value="projects" className="text-xs py-2">Projects</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs py-2">Skills</TabsTrigger>
                  <TabsTrigger value="hobbies" className="text-xs py-2">Hobbies</TabsTrigger>
                </TabsList>
                <Separator className="my-3" />
                <TabsContent value="profile" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="profile" />
                </TabsContent>
                <TabsContent value="education" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="education" />
                </TabsContent>
                <TabsContent value="experience" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="experience" />
                </TabsContent>
                <TabsContent value="projects" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="projects" />
                </TabsContent>
                <TabsContent value="skills" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="skills" />
                </TabsContent>
                <TabsContent value="hobbies" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="hobbies" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Desktop/Tablet: Side by Side Layout */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 animate-in-up">
          <Card className="print:hidden elevated hover-raise animate-in-left">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Resume Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4">
                  <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                  <TabsTrigger value="hobbies" className="text-xs">Hobbies</TabsTrigger>
                </TabsList>
                <Separator className="my-4" />
                <TabsContent value="profile" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="profile" />
                </TabsContent>
                <TabsContent value="education" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="education" />
                </TabsContent>
                <TabsContent value="experience" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="experience" />
                </TabsContent>
                <TabsContent value="projects" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="projects" />
                </TabsContent>
                <TabsContent value="skills" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="skills" />
                </TabsContent>
                <TabsContent value="hobbies" className="mt-0">
                  <CVForm formData={formData} setFormData={setFormData} section="hobbies" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="overflow-hidden elevated hover-raise animate-in-right">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  Live Preview
                </CardTitle>
                <div className="flex items-center gap-2" role="status" aria-live="polite">
                  {isValid ? (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium animate-pulse-glow">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Ready
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Enter name, email, and phone
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div id="preview" className="preview-surface glow-surface rounded-lg overflow-hidden relative">
                <div className="animate-in-scale">
                  <CVPreview formData={formData} template={template} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-4 print:hidden animate-in-up animate-delay-300">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
            <Button variant="outline" onClick={onExportJSON} className="btn-enhanced justify-center sm:justify-start">
              <FileDown className="mr-2 h-4 w-4" />
              <span className="hidden xs:inline">Export JSON</span>
              <span className="xs:hidden">JSON</span>
            </Button>
            <Button onClick={() => setShowExport(true)} disabled={!isValid} className="btn-enhanced justify-center sm:justify-start">
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden xs:inline">Export Options</span>
              <span className="xs:hidden">Export</span>
            </Button>
            <Button onClick={onPrint} disabled={!isValid} variant="outline" className="btn-enhanced justify-center sm:justify-start">
              <Printer className="mr-2 h-4 w-4" />
              <span className="hidden xs:inline">Quick PDF</span>
              <span className="xs:hidden">PDF</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Floating mode toggle */}
      <div className="fixed bottom-4 right-4 z-50 print:hidden">
        <ModeToggle />
      </div>

      {/* Full-screen overlay */}
      <FullscreenPreview
        open={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        formData={formData}
        template={template}
        onPrint={onPrint}
      />

      {/* Customization Panel */}
      {showCustomizer && (
        <CustomizationPanel
          open={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          customizations={customizations}
          setCustomizations={setCustomizations}
        />
      )}

      {/* Export Panel */}
      {showExport && (
        <ExportPDF
          open={showExport}
          onClose={() => setShowExport(false)}
          formData={formData}
          template={template}
          onPrint={onPrint}
        />
      )}

      {/* Resume Scorer */}
      {showScorer && (
        <ResumeScorer
          open={showScorer}
          onClose={() => setShowScorer(false)}
          formData={formData}
        />
      )}
    </div>
  )
}
