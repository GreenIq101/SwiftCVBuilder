"use client"

import { useEffect, useMemo, useState } from "react"
import CVForm from "./components/CVForm"
import CVPreview from "./components/CVPreview"
import TemplateSelector from "./components/TemplateSelector"
import ModeToggle from "./components/mode-toggle"
import { useToast, Toaster } from "./hooks/use-toast"
import FullscreenPreview from "./components/fullscreen-preview"
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pattern">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center glass-card p-5 rounded-4 shadow-glow animate-fade-in">
                {/* Logo and Brand */}
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                    <i className="bi bi-file-earmark-text display-6 text-primary"></i>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-1 gradient-text">SwiftCV Builder</h3>
                    <p className="text-muted small mb-0">Professional Resume Maker</p>
                  </div>
                </div>

                {/* Loading Animation */}
                <div className="position-relative mb-4">
                  <div className="spinner-border text-primary mx-auto" role="status" style={{width: "3rem", height: "3rem"}}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="spinner-border text-secondary" role="status" style={{width: "2rem", height: "2rem"}}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>

                {/* Loading Text */}
                <div className="mb-4">
                  <h4 className="fw-bold mb-2">Loading Your Workspace</h4>
                  <p className="text-muted mb-0">Preparing templates and tools...</p>
                </div>

                {/* Skeleton Cards */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-light bg-opacity-25 p-3 rounded-3">
                      <div className="placeholder-glow">
                        <div className="placeholder col-8 mb-2"></div>
                        <div className="placeholder col-12" style={{height: "60px"}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light bg-opacity-25 p-3 rounded-3">
                      <div className="placeholder-glow">
                        <div className="placeholder col-10 mb-2"></div>
                        <div className="placeholder col-12" style={{height: "60px"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    <div className="min-vh-100 bg-pattern">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="visually-hidden-focusable position-absolute top-0 start-0 z-index-999 px-3 py-2 bg-primary text-white text-decoration-none rounded">
        Skip to main content
      </a>

      <Toaster />

      {/* Modern Bootstrap Header */}
      <nav className="navbar navbar-expand-lg navbar-modern fixed-top shadow-sm">
        <div className="container">
          <a className="navbar-brand navbar-brand-modern d-flex align-items-center" href="#">
            <img src={LOGO_PATH} alt="SwiftCV Logo" className="me-2" style={{height: "32px", width: "32px"}} />
            <span className="d-none d-sm-inline">SwiftCV Builder</span>
            <span className="d-sm-none">SwiftCV</span>
          </a>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item d-none d-lg-block">
                <div className="d-flex align-items-center">
                  <span className="text-muted small me-2">Template:</span>
                  <TemplateSelector template={template} setTemplate={handleTemplateChange} />
                </div>
              </li>
              <li className="nav-item">
                <div className={`badge ${isValid ? 'bg-success' : 'bg-warning'} d-flex align-items-center gap-1`}>
                  <div className={`rounded-circle ${isValid ? 'bg-success' : 'bg-warning'}`} style={{width: "6px", height: "6px"}}></div>
                  <span className="d-none d-sm-inline">{isValid ? 'Ready' : 'Incomplete'}</span>
                  <span className="d-sm-none">{isValid ? '✓' : '!'}</span>
                </div>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              {/* Desktop Buttons */}
              <div className="d-none d-sm-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setShowCustomizer(true)}
                >
                  <i className="bi bi-palette me-1"></i>
                  <span className="d-none d-lg-inline">Customize</span>
                </button>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setShowScorer(true)}
                >
                  <i className="bi bi-target me-1"></i>
                  <span className="d-none d-lg-inline">Score CV</span>
                </button>

                <button
                  className="btn btn-gradient btn-sm"
                  onClick={() => setShowExport(true)}
                  disabled={!isValid}
                >
                  <i className="bi bi-download me-1"></i>
                  <span className="d-none d-lg-inline">Export</span>
                </button>
              </div>

              {/* Mobile Template Selector */}
              <div className="d-lg-none">
                <TemplateSelector template={template} setTemplate={handleTemplateChange} />
              </div>

              {user ? (
                <UserMenu user={user} onOpenManager={() => setShowManager(true)} />
              ) : (
                <button className="btn btn-outline-primary btn-sm" onClick={() => setShowManager(true)}>
                  <i className="bi bi-list me-1"></i>
                  <span className="d-none d-sm-inline">Sign in</span>
                </button>
              )}

              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Action Bar */}
      <div className="d-sm-none fixed-bottom bg-white border-top p-3">
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-outline-primary btn-sm rounded-circle p-2"
            onClick={() => setShowCustomizer(true)}
          >
            <i className="bi bi-palette"></i>
          </button>

          <button
            className="btn btn-outline-primary btn-sm rounded-circle p-2"
            onClick={() => setShowScorer(true)}
          >
            <i className="bi bi-target"></i>
          </button>

          <button
            className="btn btn-gradient btn-sm rounded-circle p-2"
            onClick={() => setShowExport(true)}
            disabled={!isValid}
          >
            <i className="bi bi-download"></i>
          </button>
        </div>
      </div>

      {/* If not signed in and manager requested, show auth UI inside manager overlay */}
      {!user && showManager ? (
        <div className="modal fade show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)"}} role="dialog" aria-modal="true" aria-label="Sign In">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-glow">
              <div className="modal-header border-0 bg-transparent">
                <button type="button" className="btn-close" onClick={() => setShowManager(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-0">
                <AuthScreen />
              </div>
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
      <main id="main-content" className="container-fluid mt-5 pt-5 animate-fade-in">
        <div className="container">
          {/* Mobile: Preview First, Form Second */}
          <div className="d-block d-md-none">
            {/* Mobile Preview */}
            <div className="card card-modern mb-4 shadow-sm animate-slide-in-left">
              <div className="card-header bg-white border-0">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                    <i className="bi bi-eye text-primary"></i>
                  </div>
                  <h5 className="card-title mb-0 fw-bold">Live Preview</h5>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  {isValid ? (
                    <span className="badge bg-success d-flex align-items-center">
                      <div className="bg-white bg-opacity-25 rounded-circle me-1" style={{width: "6px", height: "6px"}}></div>
                      Ready
                    </span>
                  ) : (
                    <span className="badge bg-warning d-flex align-items-center">
                      <div className="bg-white bg-opacity-25 rounded-circle me-1" style={{width: "6px", height: "6px"}}></div>
                      Incomplete
                    </span>
                  )}
                </div>
                <div id="preview" className="border rounded-3 overflow-hidden bg-white shadow-sm">
                  <div className="animate-fade-in">
                    <CVPreview formData={formData} template={template} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Form */}
            <div className="card card-modern shadow-sm animate-slide-in-right d-print-none">
              <div className="card-header bg-white border-0">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                    <i className="bi bi-pencil text-primary"></i>
                  </div>
                  <h5 className="card-title mb-0 fw-bold">Edit Details</h5>
                </div>
              </div>
              <div className="card-body p-3">
                <ul className="nav nav-tabs nav-fill mb-3" id="mobileTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active small" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab">Profile</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link small" id="education-tab" data-bs-toggle="tab" data-bs-target="#education" type="button" role="tab">Education</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link small" id="experience-tab" data-bs-toggle="tab" data-bs-target="#experience" type="button" role="tab">Experience</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link small" id="projects-tab" data-bs-toggle="tab" data-bs-target="#projects" type="button" role="tab">Projects</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link small" id="skills-tab" data-bs-toggle="tab" data-bs-target="#skills" type="button" role="tab">Skills</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link small" id="hobbies-tab" data-bs-toggle="tab" data-bs-target="#hobbies" type="button" role="tab">Hobbies</button>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="profile" role="tabpanel">
                    <CVForm formData={formData} setFormData={setFormData} section="profile" />
                  </div>
                  <div className="tab-pane fade" id="education" role="tabpanel">
                    <CVForm formData={formData} setFormData={setFormData} section="education" />
                  </div>
                  <div className="tab-pane fade" id="experience" role="tabpanel">
                    <CVForm formData={formData} setFormData={setFormData} section="experience" />
                  </div>
                  <div className="tab-pane fade" id="projects" role="tabpanel">
                    <CVForm formData={formData} setFormData={setFormData} section="projects" />
                  </div>
                  <div className="tab-pane fade" id="skills" role="tabpanel">
                    <CVForm formData={formData} setFormData={setFormData} section="skills" />
                  </div>
                  <div className="tab-pane fade" id="hobbies" role="tabpanel">
                    <CVForm formData={formData} setFormData={setFormData} section="hobbies" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet: Side by Side Layout */}
          <div className="d-none d-md-block">
            <div className="row g-4 animate-fade-in-up">
              <div className="col-lg-6">
                <div className="card card-modern shadow-sm h-100 d-print-none">
                  <div className="card-header bg-white border-0">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                        <i className="bi bi-pencil text-primary"></i>
                      </div>
                      <h5 className="card-title mb-0 fw-bold">Resume Details</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="nav nav-tabs nav-fill mb-4" id="desktopTabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active small" id="desktop-profile-tab" data-bs-toggle="tab" data-bs-target="#desktop-profile" type="button" role="tab">Profile</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link small" id="desktop-education-tab" data-bs-toggle="tab" data-bs-target="#desktop-education" type="button" role="tab">Education</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link small" id="desktop-experience-tab" data-bs-toggle="tab" data-bs-target="#desktop-experience" type="button" role="tab">Experience</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link small" id="desktop-projects-tab" data-bs-toggle="tab" data-bs-target="#desktop-projects" type="button" role="tab">Projects</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link small" id="desktop-skills-tab" data-bs-toggle="tab" data-bs-target="#desktop-skills" type="button" role="tab">Skills</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link small" id="desktop-hobbies-tab" data-bs-toggle="tab" data-bs-target="#desktop-hobbies" type="button" role="tab">Hobbies</button>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="desktop-profile" role="tabpanel">
                        <CVForm formData={formData} setFormData={setFormData} section="profile" />
                      </div>
                      <div className="tab-pane fade" id="desktop-education" role="tabpanel">
                        <CVForm formData={formData} setFormData={setFormData} section="education" />
                      </div>
                      <div className="tab-pane fade" id="desktop-experience" role="tabpanel">
                        <CVForm formData={formData} setFormData={setFormData} section="experience" />
                      </div>
                      <div className="tab-pane fade" id="desktop-projects" role="tabpanel">
                        <CVForm formData={formData} setFormData={setFormData} section="projects" />
                      </div>
                      <div className="tab-pane fade" id="desktop-skills" role="tabpanel">
                        <CVForm formData={formData} setFormData={setFormData} section="skills" />
                      </div>
                      <div className="tab-pane fade" id="desktop-hobbies" role="tabpanel">
                        <CVForm formData={formData} setFormData={setFormData} section="hobbies" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card card-modern shadow-sm h-100">
                  <div className="card-header bg-white border-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                          <i className="bi bi-eye text-primary"></i>
                        </div>
                        <h5 className="card-title mb-0 fw-bold">Live Preview</h5>
                      </div>
                      <div className="d-flex align-items-center">
                        {isValid ? (
                          <span className="badge bg-success d-flex align-items-center">
                            <div className="bg-white bg-opacity-25 rounded-circle me-1" style={{width: "6px", height: "6px"}}></div>
                            Ready
                          </span>
                        ) : (
                          <span className="badge bg-warning d-flex align-items-center">
                            <div className="bg-white bg-opacity-25 rounded-circle me-1" style={{width: "6px", height: "6px"}}></div>
                            Enter name, email, and phone
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div id="preview" className="border rounded-bottom overflow-hidden bg-white">
                      <div className="animate-fade-in">
                        <CVPreview formData={formData} template={template} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="row justify-content-end mt-4 d-print-none animate-fade-in-up">
            <div className="col-auto">
              <div className="d-flex flex-column flex-sm-row gap-2">
                <button className="btn btn-outline-primary" onClick={onExportJSON}>
                  <i className="bi bi-file-earmark-arrow-down me-2"></i>
                  <span className="d-none d-sm-inline">Export JSON</span>
                  <span className="d-sm-none">JSON</span>
                </button>
                <button className="btn btn-gradient" onClick={() => setShowExport(true)} disabled={!isValid}>
                  <i className="bi bi-download me-2"></i>
                  <span className="d-none d-sm-inline">Export Options</span>
                  <span className="d-sm-none">Export</span>
                </button>
                <button className="btn btn-outline-primary" onClick={onPrint} disabled={!isValid}>
                  <i className="bi bi-printer me-2"></i>
                  <span className="d-none d-sm-inline">Quick PDF</span>
                  <span className="d-sm-none">PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating mode toggle */}
      <div className="position-fixed bottom-0 end-0 p-3 d-print-none" style={{zIndex: 1050}}>
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
