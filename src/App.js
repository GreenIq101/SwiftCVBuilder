"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Separator } from "./components/ui/separator"
import { Download, FileUp, FileDown, Trash2, Printer, RefreshCcw, Maximize2, Save, List } from "lucide-react"
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
import { createResume, updateResume } from "./firebase"
import LandingPage from "./components/landing-page"
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

  const onQuickSeed = () => {
    setFormData({
      ...defaultForm,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      summary:
        "Full-stack developer with 5+ years experience building scalable web apps with React, Node.js, and cloud-native services.",
      education: [
        {
          level: "Bachelor's in Computer Science",
          organization: "State University",
          startDate: "2016",
          endDate: "2020",
        },
      ],
      experiences: [
        {
          title: "Senior Frontend Engineer",
          company: "Acme Corp",
          duration: "2023 - Present",
          description: "Led migration to modern tooling, implemented design system, and improved performance.",
        },
        {
          title: "Frontend Engineer",
          company: "Globex",
          duration: "2020 - 2023",
          description: "Built dashboards, optimized bundle size, and improved accessibility.",
        },
      ],
      projects: [
        {
          name: "Realtime Collab Docs",
          description: "Google-docs like editing with CRDTs.",
          link: "https://github.com/example/collab",
        },
      ],
      skills: "React, Next.js, Node.js, Tailwind CSS, PostgreSQL, Docker",
      hobbies: "Hiking, Photography, Chess",
    })
  }

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

  const onImportJSON = async (file) => {
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      setFormData({ ...defaultForm, ...data })
      toast({ title: "Imported", description: "Your data was imported successfully." })
    } catch {
      toast({ title: "Import failed", description: "Please select a valid JSON file." })
    }
  }

  const onClearAll = () => {
    setFormData(defaultForm)
    toast({ title: "Cleared", description: "All fields were reset." })
  }

  // Cloud save helpers (requires auth)
  const saveToCloud = async () => {
    if (!user) {
      setShowManager(true)
      return
    }
    if (currentResumeId) {
      await updateResume(currentResumeId, { data: formData, template })
      toast({ title: "Saved", description: "Resume updated in your account." })
    } else {
      const name = prompt("Name for this resume?")
      if (!name) return
      const id = await createResume(user.uid, { name, data: formData, template })
      setCurrentResumeId(id)
      toast({ title: "Saved", description: "Resume created in your account." })
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    )
  }

  // Show LandingPage if user is not signed in
  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="page-shell">
      <Toaster />
      <CursorLight />

      {/* Brand hero */}
      <section className="brand-hero">
        <div className="brand-hero__bg">
          <div className="shape shape--pill float-a" />
          <div className="shape shape--blob float-b" />
          <div className="shape shape--ring float-c" />
        </div>

        <div className="brand-hero__content">
          <div className="brand-hero__title">
            <span className="badge">New</span>
            <h1 className="title">
              CV Builder <span className="title-accent">Pro</span>
            </h1>
            <p className="subtitle">
              Design a standout resume with live preview, templates, save-to-cloud, and one-click PDF.
            </p>
          </div>

          <div className="brand-hero__controls">
            <TemplateSelector template={template} setTemplate={setTemplate} />
            <div className="brand-hero__right">
              {user ? (
                <UserMenu user={user} onOpenManager={() => setShowManager(true)} />
              ) : (
                <Button variant="outline" onClick={() => setShowManager(true)}>
                  <List className="h-4 w-4 mr-2" />
                  Sign in / Manage CVs
                </Button>
              )}
              <ModeToggle />
            </div>
          </div>

          <div className="brand-hero__actions">
            <Button variant="secondary" onClick={onQuickSeed}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Quick sample
            </Button>

            <input
              id="import-json"
              type="file"
              accept="application/json"
              onChange={(e) => onImportJSON(e.target.files?.[0])}
              className="hidden"
            />
            <Button variant="outline" asChild className="bg-transparent">
              <label htmlFor="import-json" className="cursor-pointer inline-flex items-center">
                <FileUp className="mr-2 h-4 w-4" />
                Import JSON
              </label>
            </Button>

            <Button variant="outline" onClick={onExportJSON} className="bg-transparent">
              <FileDown className="mr-2 h-4 w-4" />
              Export JSON
            </Button>

            <Button variant="outline" onClick={onPrint} className="bg-transparent">
              <Printer className="mr-2 h-4 w-4" />
              Print / PDF
            </Button>

            <Button onClick={() => setShowFullscreen(true)}>
              <Maximize2 className="mr-2 h-4 w-4" />
              Full screen
            </Button>

            <Button variant="destructive" onClick={onClearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>

            <Button onClick={saveToCloud}>
              <Save className="mr-2 h-4 w-4" />
              Save to Cloud
            </Button>
            <Button variant="outline" onClick={() => setShowManager(true)}>
              <List className="mr-2 h-4 w-4" />
              My CVs
            </Button>
          </div>
        </div>
      </section>

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
      <div className="container space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in">
          <Card className="print:hidden elevated hover-raise">
            <CardHeader className="pb-3">
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="hobbies">Hobbies</TabsTrigger>
                </TabsList>
                <Separator className="my-3" />
                <TabsContent value="profile">
                  <CVForm formData={formData} setFormData={setFormData} section="profile" />
                </TabsContent>
                <TabsContent value="education">
                  <CVForm formData={formData} setFormData={setFormData} section="education" />
                </TabsContent>
                <TabsContent value="experience">
                  <CVForm formData={formData} setFormData={setFormData} section="experience" />
                </TabsContent>
                <TabsContent value="projects">
                  <CVForm formData={formData} setFormData={setFormData} section="projects" />
                </TabsContent>
                <TabsContent value="skills">
                  <CVForm formData={formData} setFormData={setFormData} section="skills" />
                </TabsContent>
                <TabsContent value="hobbies">
                  <CVForm formData={formData} setFormData={setFormData} section="hobbies" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="overflow-hidden elevated hover-raise">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Live Preview</CardTitle>
                <div className="text-xs" role="status" aria-live="polite">
                  {isValid ? (
                    <span className="status-green">Ready</span>
                  ) : (
                    <span className="status-amber">Enter name, email, and phone</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div id="preview" className="preview-surface glow-surface">
                <CVPreview formData={formData} template={template} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-2 print:hidden">
          <Button onClick={onPrint} disabled={!isValid}>
            <Download className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>
        </div>
      </div>

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
    </div>
  )
}
